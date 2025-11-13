using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using MongoDB.Driver;

namespace mediumclone_api.Application.UOW
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUserRepository _userRepository { get; }
        public ITokenRepository _tokenRepository { get; }
        public IActivationRepository _activationRepository  { get; }
        public ICategoryRepository _categoryRepository  { get; }
        public ILikeRepository _likeRepository  { get; }
        public IPostRepository _postRepository  { get; }

        public UnitOfWork(IPostRepository postRepository,
         ILikeRepository likeRepository,
          ICategoryRepository categoryRepository,
           IActivationRepository activationRepository,
            IUserRepository userRepository,
            MongoDbContext db,
            ITokenRepository tokenRepository)
        {
            _postRepository = postRepository;
            _likeRepository = likeRepository;
            _categoryRepository = categoryRepository;
            _activationRepository = activationRepository;
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
        }
    }
}