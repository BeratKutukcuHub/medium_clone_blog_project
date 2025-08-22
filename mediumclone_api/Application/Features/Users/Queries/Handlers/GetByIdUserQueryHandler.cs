using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Users.Queries.Handlers
{
    public class GetByIdUserQueryHandler : IRequestHandler<GetByIdUserQuery, GetUserResponse>
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _user;

        public GetByIdUserQueryHandler(IMapper mapper, IUserRepository user)
        {
            _mapper = mapper;
            _user = user;
        }

        public async Task<GetUserResponse> Handle(GetByIdUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _user.GetEntity(request.Id);
            return _mapper.Map<GetUserResponse>(user);
        }
    }
}