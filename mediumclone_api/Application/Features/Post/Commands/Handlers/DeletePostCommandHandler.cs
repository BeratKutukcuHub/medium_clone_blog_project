using AutoMapper;
using MediatR;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand, bool>
    {
        private IPostRepository _postRepository;

        public DeletePostCommandHandler(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<bool> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            await _postRepository.DeleteEntity(request.PostId);
            return true;
        }
    }
}