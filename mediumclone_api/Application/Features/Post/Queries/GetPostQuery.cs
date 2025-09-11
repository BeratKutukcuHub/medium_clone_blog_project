using MediatR;
using mediumclone_api.Application.Features.Post.Profiles;

namespace mediumclone_api.Application.Features.Post.Queries
{
    public class GetPostQuery : IRequest<PostGetDto>
    {
        public string PostId { get; set; }
    }
}