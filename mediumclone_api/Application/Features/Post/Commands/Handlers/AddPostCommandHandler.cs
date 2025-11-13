using AutoMapper;
using MediatR;
using mediumclone_api.Application.UOW;

namespace mediumclone_api.Application.Features.Post.Commands.Handlers
{
    public class AddPostCommandHandler : IRequestHandler<AddPostCommand, bool>
    {
        private IMapper _mapper;
        private IUnitOfWork _uow;
        public AddPostCommandHandler(IMapper mapper, IUnitOfWork uow)
        {
            _mapper = mapper;
            _uow = uow;
        }

        public async Task<bool> Handle(AddPostCommand request, CancellationToken cancellationToken)
        {
            var responseIds = await _uow._categoryRepository.AddNotFoundCategories(request.Categories);
            request.Categories = responseIds;
            await _uow._postRepository.InsertEntity(_mapper.Map<Domain.Entities.Post>(request));
            return true;
        }
    }
}