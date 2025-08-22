using System.Text;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.IdentityModel.Tokens;

namespace mediumclone_api.Web.Extensions
{
    public static class AuthenticationExtension
    {
        public static void AuthenticationService(this WebApplicationBuilder _service)
        {
            var optionDictionary = _service.Configuration.GetSection("JwtOptions");
            _service.Services.AddAuthentication(configuration =>
            {
                configuration.DefaultAuthenticateScheme = BearerTokenDefaults.AuthenticationScheme;
                configuration.DefaultChallengeScheme = BearerTokenDefaults.AuthenticationScheme;
                configuration.DefaultScheme = BearerTokenDefaults.AuthenticationScheme;
            }).AddJwtBearer(authenticationSchema =>
            {
                authenticationSchema.TokenValidationParameters = new Microsoft.IdentityModel.
                Tokens.TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = optionDictionary["Issuer"],
                    ValidAudience = optionDictionary["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(optionDictionary["SecretKey"]))
                };
            });
            
        }
    } 
}