using AutoMapper;
using MediatR;
using mediumclone_api.Application.UOW;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class ActivateSignupCommandHandler : IRequestHandler<ActivateSignupCommand,User>
    {
        private IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public ActivateSignupCommandHandler(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task<User?> Handle(ActivateSignupCommand request, CancellationToken cancellationToken)
        {
            var checkActivation = await _uow._activationRepository.ActivationCheckerAsync(request.Email);
                if (checkActivation.IsUsed)
            {
                    request.IsActive = true;
                    await _uow._userRepository.AddUser(_mapper.Map<User>(request));
                    await _uow._activationRepository.DeleteEntity(checkActivation.Id);
                    return await _uow._userRepository.GetUser(request.Username);
            }
            return null;
        }
    }
}