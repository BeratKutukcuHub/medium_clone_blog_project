using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task AddUser(User userDto);
        Task<User> GetUser(string userName);
        Task<User> UserChecker(User user);
        Task<User?> ActivatePendingUserAsync(string email);
    }
}