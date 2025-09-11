using System.Net.Http.Headers;
using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Post.Profiles;
using mediumclone_api.Application.Features.Post.Queries;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class GetPostQueryHandler : IRequestHandler<GetPostQuery, PostGetDto>
    {
        private IMapper _mapper;
        private IPostRepository _postRepository;

        public GetPostQueryHandler(IMapper mapper, IPostRepository postRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }
        public async Task<PostGetDto> Handle(GetPostQuery request, CancellationToken cancellationToken)
        {
            var post = await _postRepository.GetEntity(request.PostId);
            return _mapper.Map<PostGetDto>(post);
        }
    }
}