using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Auth.Profiles;
using mediumclone_api.Application.UOW;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class SigninCommandHandler : IRequestHandler<SigninCommand, GetUserDto>
    {
        IUnitOfWork _uow;
        IMapper _mapper;

        public SigninCommandHandler(IMapper mapper, IUnitOfWork uow)
        {
            _mapper = mapper;
            _uow = uow;
        }

        public async Task<GetUserDto> Handle(SigninCommand request, CancellationToken cancellationToken)
        {
            var responseUserInfo = await _uow._userRepository.ActivatePendingUserAsync(request.Email);
            responseUserInfo.IsActive = true;
            await _uow._userRepository.UpdateEntiy(responseUserInfo.Id, responseUserInfo);
            var responseActivation = await _uow._activationRepository.ActivationCheckerAsync(request.Email);
            await _uow._activationRepository.DeleteEntity(responseActivation.Id);
            return _mapper.Map<GetUserDto>(responseUserInfo);
        }
    }
}