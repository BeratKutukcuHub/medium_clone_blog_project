using mediumclone_ui.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface IUserRepository
    {
        Task AddUser(User userDto);
    }
}