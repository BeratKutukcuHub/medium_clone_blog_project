using MediatR;
using mediumclone_api.Application.Features.Categories.Profile;

namespace mediumclone_api.Application.Features.Categories.Queries
{
    public class GetCategoriesQuery : IRequest<List<GetCategories>>{}
}