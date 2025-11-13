using System.Net.Http.Headers;
using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Post.Profiles;
using mediumclone_api.Application.Features.Post.Queries;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class GetAllPostQueryHandler : IRequestHandler<GetAllPostQuery, IEnumerable<PostGetDto>>
    {
        private IMapper _mapper;
        private IPostRepository _postRepository;

        public GetAllPostQueryHandler(IMapper mapper, IPostRepository postRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
        }

        public async Task<IEnumerable<PostGetDto>> Handle(GetAllPostQuery request, CancellationToken cancellationToken)
        {
            var posts = await _postRepository.GetEntities();
            return _mapper.Map<List<PostGetDto>>(posts);
        }
    }
}