using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Categories.Profile;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Categories.Queries.Handlers
{
    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, List<GetCategories>>
    {
        ICategoryRepository _catRepository;
        IMapper _map;

        public GetCategoriesQueryHandler(ICategoryRepository catRepository, IMapper map)
        {
            _catRepository = catRepository;
            _map = map;
        }

        public async Task<List<GetCategories>> Handle(GetCategoriesQuery request,
        CancellationToken cancellationToken)
        {
            var categories = await _catRepository.GetEntities();
            var mapCategories = _map.Map<List<GetCategories>>(categories);
            return mapCategories;
        }
    }
}