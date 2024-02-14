using Calorie.DAL.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.DAL.Repositories
{
    public interface I_EntryRepository
    {
        public IQueryable<EntryEntity> Get();
        public Task<Guid> Save(EntryEntity entry, Guid userId);
        public Task Delete(EntryEntity entry);
    }
}
