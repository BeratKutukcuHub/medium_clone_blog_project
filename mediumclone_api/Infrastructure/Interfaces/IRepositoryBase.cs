using mediumclone_api.Domain.Entities;
using MongoDB.Driver;

namespace mediumclone_api.Infrastructure.Interfaces;

public interface IRepositoryBase<T> where T : BaseEntity
{
    Task InsertEntity(T entity);
    Task<string> InsertEntityIdResponse(T entity);
    Task DeleteEntity(string Id);
    Task UpdateEntiy(string Id, T newlyEntity);
    Task<IEnumerable<T>> GetEntities();
    Task<T> GetEntity(string Id);
}