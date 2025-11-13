using MediatR;
using mediumclone_api.Application.UOW;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Concreties;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;

namespace mediumclone_api.Web.Extensions;

public static class CQRS_Services
{
    public static void AllServices(this IServiceCollection _services)
    {
        _services.AddScoped<IUserRepository, UserRepository>();
        _services.AddScoped<IPostRepository, PostRepository>();
        _services.AddScoped<ILikeRepository, LikeRepository>();
        _services.AddScoped<ICommentRepository, CommentRepository>();
        _services.AddScoped<ICategoryRepository, CategoryRepository>();
        _services.AddScoped<IActivationRepository, ActivationRepository>();
        _services.AddScoped<ITokenRepository, TokenRepository>();
        _services.AddSingleton<MongoDbContext>();
        _services.AddScoped<IUnitOfWork, UnitOfWork>();
        _services.AddScoped(typeof(MongoDbContext));
        _services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
    }
}