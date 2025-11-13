using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using mediumclone_api.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver.Linq;

namespace mediumclone_api.Application.Utilities
{
    public class TokenService
    {
        private readonly IConfiguration _configurationService;

        public TokenService(IConfiguration configurationService)
        {
            _configurationService = configurationService;
        }
        private List<Claim> TokenClaims(User _user, string expireDate)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, _user.Id),
                new Claim(ClaimTypes.Name , _user.Username),
                new Claim(ClaimTypes.Country , "Turkey"),
                new Claim(ClaimTypes.Email , _user.Email),
                new Claim(ClaimTypes.Expiration , expireDate),
            };
            foreach (var role in _user.Role)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }
        private (string issuer, string audience, DateTime expire, string key, List<Claim> claims) GetSection(User _user)
        {
            var options = _configurationService.GetSection("JwtOptions");
            DateTime expireTime = DateTime.UtcNow.AddHours(Convert.ToDouble(options["Expire"]));

            var claimList = TokenClaims(_user, expireTime.ToString() ?? "");
            return (
                issuer: options["Issuer"] ?? "",
                audience: options["Audience"] ?? "",
                expire: expireTime,
                key: options["SecretKey"] ?? "",
                claims: claimList
            );
        }
        private SecurityKey Key(string secretKey) => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        private JwtSecurityToken TokenFactory(User _user)
        {
            var sections = GetSection(_user);
            var theToken = new JwtSecurityToken(
                issuer: sections.issuer,
                audience: sections.audience,
                claims: sections.claims,
                null,
                expires: sections.expire,
                signingCredentials: new SigningCredentials(
                    Key(sections.key),
                    algorithm: SecurityAlgorithms.HmacSha256
                )
            );
            return theToken;
        }
        public (string token, List<Claim> claims) GetToken(User user)
        {
            var token = TokenFactory(user);
            return (
                token: new JwtSecurityTokenHandler().WriteToken(token),
                claims: (List<Claim>)token.Claims
            );
        }
        public string GetToken()
        {
            var options = _configurationService.GetSection("JwtOptions");
            var secretKey = options["SecretRefreshToken"];
            var refrehToken = new JwtSecurityToken(
            issuer: null,
            audience: null,
            claims: null,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                SecurityAlgorithms.HmacSha256
            ));
            return new JwtSecurityTokenHandler().WriteToken(refrehToken);
        }
        public bool ValidateRefreshToken(string refreshToken)
        {
            var options = _configurationService.GetSection("JwtOptions");
            var secretKey = options["SecretRefreshToken"];
            var validation = new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };
            try
            {
                var handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(refreshToken, validation, out SecurityToken validatedToken);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}