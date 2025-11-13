using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface ITokenRepository : IRepositoryBase<Token>
    {
        Task<Token?> GetTokenWithUserId(string userId);
    }
}