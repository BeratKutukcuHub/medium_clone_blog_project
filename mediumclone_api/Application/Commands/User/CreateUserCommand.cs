using MediatR;

namespace mediumclone_api.Application.Commands.User;

public class CreateUserCommand : IRequest
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