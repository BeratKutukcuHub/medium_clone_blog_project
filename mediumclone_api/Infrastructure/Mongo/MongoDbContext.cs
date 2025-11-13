using mediumclone_api.Common.Utilities;
using mediumclone_api.Domain.Entities;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Mongo;

public class MongoDbContext
{
    public readonly IMongoDatabase _db;
    public MongoDbContext(IConfiguration configurationParameters)
    {
        var mongoDbSections = configurationParameters.GetSection("MongoDb");
        var client = new MongoClient(mongoDbSections["ConnectionString"]);
        _db = client.GetDatabase(mongoDbSections["DatabaseName"]);
    }
    public virtual IMongoCollection<T> GetCollectionForBase<T>()
    {
        var entity = MongoDbManipulationTry.DataBaseName<T>();
        return _db.GetCollection<T>(entity);
    }
}