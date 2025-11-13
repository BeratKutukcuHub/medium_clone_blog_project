using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Auth.Profiles;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SignupCommandHandler : IRequestHandler<SignupCommand, GetUserDto>
    {
        IMapper _mapper;
        IUserRepository _userRepository;
        public SignupCommandHandler(IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<GetUserDto> Handle(SignupCommand request, CancellationToken cancellationToken)
        {
                var user = _mapper.Map<User>(request);
                await _userRepository.AddUser(user);
                return _mapper.Map<GetUserDto>(await _userRepository.GetUser(user.Username));
        }
    }
}