using AutoMapper;
using MediatR;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Categories.Commands.Handlers
{
    public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand, bool>
    {
        ICategoryRepository _catRepository;
        IMapper _mapper;

        public AddCategoryCommandHandler(ICategoryRepository catRepository, IMapper mapper)
        {
            _catRepository = catRepository;
            _mapper = mapper;
        }

        public async Task<bool> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
        {
            await _catRepository.InsertEntity(_mapper.Map<Category>(request));
            return true;
        }
    }
}