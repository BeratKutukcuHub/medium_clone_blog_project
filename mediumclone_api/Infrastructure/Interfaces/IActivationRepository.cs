
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Infrastructure.Interfaces
{
    public interface IActivationRepository : IRepositoryBase<Activation>
    {
        Task<Activation> ActivationCheckerAsync(string email);
    }
}