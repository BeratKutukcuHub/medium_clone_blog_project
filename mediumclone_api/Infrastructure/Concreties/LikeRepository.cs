using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class LikeRepository : RepositoryBase<Like>, ILikeRepository
    {
        public LikeRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }
        public async Task LikeForPostAsync(Like like)
        {
            await _collection.InsertOneAsync(like);
        }
        public async Task DeleteLikeForPostAsync(string LikeId)
        {
            var entity = Builders<Like>.Filter.Eq(x => x.Id, LikeId);
            await _collection.DeleteOneAsync(entity);
        }
    }
}