using MediatR;
using mediumclone_api.Application.Features.Auth.Profiles;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SignupCommand : IRequest<GetUserDto>
    {
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public IEnumerable<string> Role { get; set; }
    }
}