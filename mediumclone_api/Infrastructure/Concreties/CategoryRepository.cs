using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }
        public async Task<List<string>> AddNotFoundCategories(List<string> categories)
        {
            var categoryIDs = new List<string>();
            foreach (string category in categories)
            {
                var findEquelCategories = Builders<Category>.Filter.Eq(cat => cat.Topic.Trim(), category.Trim());
                var response = await _collection.Find(findEquelCategories).FirstOrDefaultAsync();
                if (response is not null)
                {
                    categoryIDs.Add(response.Id);
                    continue;
                }
                var Id = await InsertEntityIdResponse(new Category
                {
                    Topic = category
                });
                categoryIDs.Add(Id);
            }
            return categoryIDs;
        }
    }
}