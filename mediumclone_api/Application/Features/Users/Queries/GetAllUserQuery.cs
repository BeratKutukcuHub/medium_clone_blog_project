using MediatR;
using mediumclone_api.Application.Features.Profiles;

namespace mediumclone_api.Application.Features.Users.Queries
{
    public class GetAllUserQuery : IRequest<List<GetUserResponse>>
    {
        
    }
}