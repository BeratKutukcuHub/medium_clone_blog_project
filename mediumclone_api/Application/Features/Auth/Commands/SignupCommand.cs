using MediatR;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SignupCommand : IRequest<SignupCommand>
    {
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}