using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using mediumclone_ui.Domain.Entities;

namespace mediumclone_api.Infrastructure.Concreties;

public class UserRepository : IUserRepository
{
    private readonly MongoDbContext _userMongoDbContext;

    public UserRepository(MongoDbContext userMongoDbContext)
    {
        _userMongoDbContext = userMongoDbContext;
    }

    public async Task AddUser(User userDto)
    {
        await _userMongoDbContext.Users.InsertOneAsync(userDto);
    }
}