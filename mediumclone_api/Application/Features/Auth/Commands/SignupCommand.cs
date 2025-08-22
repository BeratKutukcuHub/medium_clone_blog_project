using MediatR;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SignupCommand : IRequest<Unit>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}