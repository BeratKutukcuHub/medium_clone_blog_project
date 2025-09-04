using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Common.Shared;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SigninCommandHandler : IRequestHandler<SigninCommand, TokenAndClaim>
    {
        private readonly TokenService _tokenGenerator;
        private readonly IUserRepository _user;

        public SigninCommandHandler(IUserRepository user, TokenService tokenGenerator)
        {
            _user = user;
            _tokenGenerator = tokenGenerator;
        }
        public async Task<TokenAndClaim> Handle(SigninCommand request, CancellationToken cancellationToken)
        {
            var responses = await _user.GetEntities();
            foreach (var user in responses)
            {
                if (user.Username == request.UserName.Trim() && user.Email == request.Email.Trim())
                {
                    var tokenGenerator = _tokenGenerator.GetToken(user);
                    var refreshToken = _tokenGenerator.GetToken();
                    return new TokenAndClaim
                    {
                        Claims = tokenGenerator.claims,
                        Token = tokenGenerator.token,
                        RefreshToken = refreshToken
                    };
                }
            }
            throw new Exception("Not found the user");
        }
    }
}