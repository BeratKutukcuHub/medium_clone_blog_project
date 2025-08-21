using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task AddUser(User userDto);
    }
}