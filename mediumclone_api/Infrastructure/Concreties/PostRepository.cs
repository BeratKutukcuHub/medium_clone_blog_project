using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class PostRepository : RepositoryBase<Post>, IPostRepository
    {
        public PostRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }
    }
}