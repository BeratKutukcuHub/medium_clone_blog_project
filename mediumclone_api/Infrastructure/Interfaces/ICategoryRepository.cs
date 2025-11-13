using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        Task<List<string>> AddNotFoundCategories(List<string> categories);
    }
}