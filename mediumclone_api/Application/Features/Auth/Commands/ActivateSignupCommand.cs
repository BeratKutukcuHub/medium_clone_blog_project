using MediatR;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class ActivateSignupCommand : IRequest<User>
    {
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IEnumerable<string> Role { get; set; }
        public bool IsActive { get; set; } = false;
        public ActivateSignupCommand()
        {
            Role = new List<string>()
            {
                "User"
            };
        }
    }
}