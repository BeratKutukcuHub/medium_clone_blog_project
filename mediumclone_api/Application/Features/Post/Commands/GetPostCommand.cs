using MediatR;
using mediumclone_api.Application.Features.Post.Profiles;

namespace mediumclone_api.Application.Features.Post.Commands
{
    public class GetPostCommand : IRequest<PostGetDto>
    {
        public string Id { get; set; }
    }
}