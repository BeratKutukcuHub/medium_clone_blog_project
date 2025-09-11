using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class CommentRepository : RepositoryBase<Comment>, ICommentRepository
    {
        public CommentRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }
        public async Task CommentForPostAsync(Comment comment)
        {
            await _collection.InsertOneAsync(comment);
        }
        public async Task CommentDeleteOnPostAsync(string PostId)
        {
            var entity = Builders<Comment>.Filter.Eq(x => x.Id, PostId);
            await _collection.DeleteOneAsync(entity);
        }
    }
}