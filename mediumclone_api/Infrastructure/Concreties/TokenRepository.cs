using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties
{
    public class TokenRepository : RepositoryBase<Token>, ITokenRepository
    {
        public TokenRepository(MongoDbContext mongoDb) : base(mongoDb)
        {
        }

        public async Task<Token?> GetTokenWithUserId(string userId)
        {
            var filter = Builders<Token>.Filter.Eq(token => token.UserId, userId);
            var response = await _collection.Find(filter).FirstOrDefaultAsync();
            if(response is null)
            {
                var responseId = await InsertEntityIdResponse(new Token
                {
                    UserId = userId
                });
                return await GetEntity(responseId);
            }
            return response;
        }
    }
}