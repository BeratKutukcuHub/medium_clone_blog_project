using MediatR;
using mediumclone_api.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand, bool>
    {
        IHttpContextAccessor _httpContextAccesor;
        IUserRepository _userRepository;
        public LogoutCommandHandler(IHttpContextAccessor httpContextAccesor, IUserRepository userRepository)
        {
            _httpContextAccesor = httpContextAccesor;
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _httpContextAccesor.HttpContext.Response.Cookies.Delete("x-token",new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Path = "/"
                });
                await _userRepository.UpdateEntiy(request.Id, new Domain.Entities.User
                {
                    IsActive = false
                });
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}