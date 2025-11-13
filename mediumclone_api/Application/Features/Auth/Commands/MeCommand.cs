using MediatR;
using mediumclone_api.Application.Features.Auth.Profiles;
using mediumclone_api.Application.Features.Profiles;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class MeCommand : IRequest<TokenResponseDto>
    {
        public string Id { get; set; } 
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public IEnumerable<string> Role { get; set; } = new List<string>
        {
            "User"
        };
    }
}