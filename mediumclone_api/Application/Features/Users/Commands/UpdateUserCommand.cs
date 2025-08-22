using MediatR;

namespace mediumclone_api.Application.Features.Users.Commands;

public class UpdateUserCommand : IRequest<string>
{
    public string Id { get; set; }
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public IEnumerable<string> Role { get; set; }

}