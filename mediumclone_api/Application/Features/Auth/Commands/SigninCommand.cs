using MediatR;
using mediumclone_api.Application.Features.Auth.Profiles;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SigninCommand : IRequest<GetUserDto>
    {
        public string Email { get; set; }
    }
}