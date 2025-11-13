using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class ActivationRepository : RepositoryBase<Activation>, IActivationRepository
    {
        public ActivationRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }

        public async Task<Activation> ActivationCheckerAsync(string activation)
        {
            var filter = Builders<Activation>.Filter.Eq(x => x.Email, activation);
            var sort = Builders<Activation>.Sort.Descending(x => x.ExpireAt); 

            var result = await _collection
            .Find(filter)
            .Sort(sort)
            .Limit(1)
            .FirstOrDefaultAsync();
            return result;
        }
    }
}