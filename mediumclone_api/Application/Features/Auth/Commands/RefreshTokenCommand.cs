using MediatR;
using mediumclone_api.Common.Shared;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class RefreshTokenCommand : IRequest<RefreshTokenDto>
    {
        public string RefreshToken { get; set; }
        public RefreshTokenUserInformation UserInformation {get; set;}
    }
}