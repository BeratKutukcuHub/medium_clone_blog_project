using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;

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
}