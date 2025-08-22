using MediatR;
using mediumclone_api.Application.Features.Profiles;

namespace mediumclone_api.Application.Features.Users.Commands;

public class CreateUserCommand : IRequest<CreateUserResponse>
{
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public IEnumerable<string> Role { get; set; }
    public CreateUserCommand()
    {
        Role = new List<string>()
        {
            "User"
        };
    }
}