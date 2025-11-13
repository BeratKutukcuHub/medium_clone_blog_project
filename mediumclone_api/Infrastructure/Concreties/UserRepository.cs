using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties;

public class UserRepository : RepositoryBase<User>, IUserRepository
{
    public UserRepository(MongoDbContext mongoDb) : base(mongoDb)
    {
    }
    public async Task AddUser(User userDto)
    {
        await InsertEntity(userDto);
    }
    public async Task<User> GetUser(string userName)
    {
        var filter = Builders<User>.Filter.Eq(x => x.Username, userName);
        var userInfo = await _collection.FindAsync(filter);
        return userInfo.First();
    }
    public async Task<User> UserChecker(User user)
    {
        var filterUser = Builders<User>.Filter.Eq(us => us.Email, user.Email);
        var userInfo = await _collection.FindAsync(filterUser);
        return await userInfo.FirstAsync();
    }
    public async Task<User?> ActivatePendingUserAsync(string email)
    {
    var filter = Builders<User>.Filter.Eq(x => x.Email, email);
    var user = await _collection.Find(filter).FirstOrDefaultAsync();

    if (user == null)
        return null;

    if (!user.IsActive)
    {
        var update = Builders<User>.Update.Set(x => x.IsActive, true);
        await _collection.UpdateOneAsync(filter, update);
        user.IsActive = true; 
    }
    return user;
    }

}