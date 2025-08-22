using AutoMapper;
using Isopoh.Cryptography.Argon2;
using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SigninCommandHandler : IRequestHandler<SigninCommand, string>
    {
        private readonly TokenService _tokenGenerator;
        private readonly IUserRepository _user;

        public SigninCommandHandler(IUserRepository user, TokenService tokenGenerator)
        {
            _user = user;
            _tokenGenerator = tokenGenerator;
        }
        public async Task<string> Handle(SigninCommand request, CancellationToken cancellationToken)
        {
            var responses = await _user.GetEntities();
            foreach (var user in responses)
            {
                if (user.Username == request.UserName.Trim() && Argon2.Verify(user.PasswordHash, request.PasswordHash))
                {
                    return _tokenGenerator.GetToken(user);
                }
            }
            throw new Exception("Not found the user");
        }
    }
}