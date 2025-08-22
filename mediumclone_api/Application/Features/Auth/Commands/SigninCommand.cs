using MediatR;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SigninCommand : IRequest<string>
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
    }
}