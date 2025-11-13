using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Application.UOW;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Domain.Entities;
using Microsoft.AspNetCore.Http;


namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class MeCommandHandler : IRequestHandler<MeCommand,TokenResponseDto>
    {
        IHttpContextAccessor _http;
        TokenService _tokenCreator;
        IUnitOfWork _uow;

        public MeCommandHandler(IHttpContextAccessor http, TokenService tokenCreator, IUnitOfWork uow)
        {
            _http = http;
            _tokenCreator = tokenCreator;
            _uow = uow;
        }

        public async Task<TokenResponseDto> Handle(MeCommand request, CancellationToken cancellationToken)
        {
            var requestCookie = _http.HttpContext.Request.Cookies["x-token"];
            var jwtResponse = new JwtSecurityTokenHandler().ReadJwtToken(requestCookie);
            var expDate = DateTimeOffset.FromUnixTimeSeconds((long)jwtResponse.Payload.Exp).UtcDateTime;
            var userId = jwtResponse.Payload.FirstOrDefault(x => x.Key == ClaimTypes.NameIdentifier).Value.ToString();
            var tokenResponse = await _uow._tokenRepository.GetTokenWithUserId(userId);
            var user = await _uow._userRepository.GetEntity(userId);
            
            if (tokenResponse.ExpTimeSpan > DateTime.UtcNow)
            {
                if (expDate > DateTime.UtcNow)
                {
                    _http.HttpContext.Response.Cookies.Append("x-token", requestCookie, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.UtcNow.AddMinutes(60)
                    });
                    return new TokenResponseDto { isOk = true, User = user };
                }
                else
                {
                    var tokenService = _tokenCreator.GetToken(user);
                    _http.HttpContext.Response.Cookies.Append("x-token", tokenService.token);
                    return new TokenResponseDto { isOk = true, User = user };
                } 
            }
            return new TokenResponseDto { isOk = false, User = null };
        }
    }
}