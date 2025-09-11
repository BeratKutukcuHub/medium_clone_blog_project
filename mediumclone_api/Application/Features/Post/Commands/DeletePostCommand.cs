using MediatR;

namespace mediumclone_api.Application.Features.Post.Commands
{
    public class DeletePostCommand : IRequest<bool>
    {
        public string PostId { get; set; }
    }
}