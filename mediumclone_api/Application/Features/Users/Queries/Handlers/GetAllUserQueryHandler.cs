using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Users.Queries.Handlers
{
    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, List<GetUserResponse>>
    {
        private readonly IUserRepository _user;
        private readonly IMapper _mapper;
        public GetAllUserQueryHandler(IUserRepository user, IMapper mapper)
        {
            _user = user;
            _mapper = mapper;
        }

        public async Task<List<GetUserResponse>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
        {
            var users = await _user.GetEntities();
            return _mapper.Map<List<GetUserResponse>>(users);
        }
    }
}