using AutoMapper;
using MediatR;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class AddPostCommandHandler : IRequestHandler<AddPostCommand, bool>
    {
        private IMapper _mapper;
        private IPostRepository _postRepository;

        public AddPostCommandHandler(IMapper mapper, IPostRepository postRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }

        public async Task<bool> Handle(AddPostCommand request, CancellationToken cancellationToken)
        {
            await _postRepository.InsertEntity(_mapper.Map<Domain.Entities.Post>(request));
            return true;
        }
    }
}