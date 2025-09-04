using AutoMapper;
using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SignupCommandHandler : IRequestHandler<SignupCommand,SignupCommand>
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _user;

        public SignupCommandHandler(IMapper mapper, IUserRepository user)
        {
            _mapper = mapper;
            _user = user;
        }

        public async Task<SignupCommand> Handle(SignupCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<User>(request);
            await _user.InsertEntity(user);
            return _mapper.Map<SignupCommand>(user);
        }

    }
}