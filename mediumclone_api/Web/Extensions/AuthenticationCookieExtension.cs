using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace mediumclone_api.Web.Extensions
{
    public static class AuthenticationCookieExtension
    {
        public static void AuthenticationCookie(this IServiceCollection _service, IConfiguration _config)
        {
            _service.AddAuthentication().AddJwtBearer(
                JwtBearerDefaults.AuthenticationScheme, configureOptions =>
                {
                        var options = _config.GetSection("JwtOptions");
                        configureOptions.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = options["Issuer"],
                            ValidAudience = options["Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding
                            .UTF8.GetBytes(options["SecretKey"]))
                        };
                    configureOptions.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = (context) =>
                        {
                            var cookieJwt = context.HttpContext.Request.Cookies["x-token"];
                            if (cookieJwt is not null)
                                context.Token = cookieJwt;
                            return Task.CompletedTask;
                        }
                    };
                }
            );            
        }
        public static void AuthorizationCookie(this IServiceCollection _service)
        {
            _service.AddAuthorization(config =>
            {
                config.AddPolicy("Policy", pol =>
                {
                    pol.RequireAuthenticatedUser();
                    pol.RequireRole("User");
                });
            });
        }
    }
}