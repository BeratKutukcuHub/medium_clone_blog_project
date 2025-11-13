using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Post.Profiles;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class GetPostCommandHandler : IRequestHandler<GetPostCommand, PostGetDto>
    {
        IPostRepository _postRepository;
        IMapper _mapper;
        public GetPostCommandHandler(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        public async Task<PostGetDto> Handle(GetPostCommand request, CancellationToken cancellationToken)
        {
            var response = await _postRepository.GetEntity(request.Id);
            return _mapper.Map<PostGetDto>(response);
        }
    }
}