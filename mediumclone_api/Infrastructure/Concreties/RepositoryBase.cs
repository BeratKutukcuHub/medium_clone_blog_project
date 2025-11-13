using Isopoh.Cryptography.Argon2;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_api.Infrastructure.Mongo;
using mediumclone_api.Infrastructure.Utilities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Concreties;

public class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
{
    protected readonly IMongoCollection<T> _collection;
    private readonly MongoDbContext _mongoDb;

    public RepositoryBase(MongoDbContext mongoDb)
    {
        _mongoDb = mongoDb;
        _collection = mongoDb.GetCollectionForBase<T>();
    }

    public async Task DeleteEntity(string Id)
    {
        var filterDelete = Builders<T>.Filter.Eq(x => x.Id, Id);
        await _collection.DeleteOneAsync(filterDelete);
    }
    public async Task<IEnumerable<T>> GetEntities()
    {
        var allEntities = await _collection.Find(x => true).ToListAsync();
        return allEntities;
    }
    public async Task<T> GetEntity(string Id)
    {
        if (!ObjectId.TryParse(Id, out _))
        {
            throw new Exception("This Id is wrong.");
        }
        var filterGetEntity = Builders<T>.Filter.Eq(x => x.Id, Id);
        var entity = await _collection.Find(filterGetEntity).FirstOrDefaultAsync();
        return entity;
    }
    public async Task InsertEntity(T entity)
    {
        entity.Id = ObjectId.GenerateNewId().ToString();
        await _collection.InsertOneAsync(entity);
    }
    public async Task<string> InsertEntityIdResponse(T entity)
    {
        entity.Id = ObjectId.GenerateNewId().ToString();
        await _collection.InsertOneAsync(entity);
        return entity.Id;
    }
    public async Task UpdateEntiy(string Id , T newlyEntity)
    {
        if (!ObjectId.TryParse(Id, out _))
            throw new ArgumentException("Invalid Id");
        HasherPassword.Hash(newlyEntity);
        var getEntity = Builders<T>.Filter.Eq(eq => eq.Id, Id);
        await _collection.ReplaceOneAsync(getEntity, newlyEntity);
    }

}
