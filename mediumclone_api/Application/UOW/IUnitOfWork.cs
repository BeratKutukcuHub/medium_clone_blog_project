using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.UOW
{
    public interface IUnitOfWork
    {
        IUserRepository _userRepository { get; }
        IActivationRepository _activationRepository { get; }
        ICategoryRepository _categoryRepository { get; }
        ILikeRepository _likeRepository { get; }
        IPostRepository _postRepository { get; }
        ITokenRepository _tokenRepository { get; }
        
    }
}