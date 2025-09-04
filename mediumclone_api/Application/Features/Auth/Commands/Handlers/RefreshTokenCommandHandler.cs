using AutoMapper;
using MediatR;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Common.Shared;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, RefreshTokenDto>
    {
        private readonly TokenService _service;
        private readonly IMapper _mapper;
        public RefreshTokenCommandHandler(TokenService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        public async Task<RefreshTokenDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            await Task.Delay(0);
            bool isExpire = _service.ValidateRefreshToken(request.RefreshToken);
            if (isExpire)
                return new RefreshTokenDto
                {
                    isExpire = true,
                    Token = _service.GetToken(_mapper.Map<User>(request.UserInformation)).token
                };
            else return new RefreshTokenDto
            {
                isExpire = false,
                Token = null
            };
        }
    }
}