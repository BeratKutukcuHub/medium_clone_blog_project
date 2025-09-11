using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface ILikeRepository: IRepositoryBase<Like>
    {
        Task LikeForPostAsync(Like like);
        Task DeleteLikeForPostAsync(string LikeId);
    }
}