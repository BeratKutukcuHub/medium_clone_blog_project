using MediatR;
using mediumclone_api.Application.Features.Profiles;

namespace mediumclone_api.Application.Features.Users.Queries;

public class GetByIdUserQuery : IRequest<GetUserResponse>
{
    public string Id { get; set; }
}