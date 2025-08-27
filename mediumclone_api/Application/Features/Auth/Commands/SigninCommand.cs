using MediatR;
using mediumclone_api.Common.Shared;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SigninCommand : IRequest<TokenAndClaim>
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
    }
}