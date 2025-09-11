using MediatR;

namespace mediumclone_api.Application.Features.Post.Commands
{
    public class AddPostCommand : IRequest<bool>
    {
        public string UserId { get; set; }
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
    }
}