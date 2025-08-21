using mediumclone_api.Infrastructure.Concreties;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;

namespace mediumclone_api.Web.Extensions;

public static class CQRS_Services
{
    public static void AllServices(this IServiceCollection _services)
    {
        _services.AddScoped<IUserRepository, UserRepository>();
        _services.AddSingleton<MongoDbContext>();
    }
}