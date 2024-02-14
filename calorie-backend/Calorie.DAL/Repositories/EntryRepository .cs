using Calorie.DAL.Contexts;
using Calorie.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.DAL.Repositories
{
    public class EntryRepository : I_EntryRepository
    {
        private readonly CalorieContext _ctx;

        public EntryRepository(CalorieContext ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<EntryEntity> Get()
        {
            return _ctx.EntryEntity.AsQueryable();
        }

        public async Task<Guid> Save(EntryEntity entry, Guid userId)
        {
            entry.User = await _ctx.UserEntity.FirstOrDefaultAsync(r => r.Id == userId);

            if (entry.Id == Guid.Empty)
            {
                _ctx.EntryEntity.Add(entry);
            }
            else
            {
                _ctx.EntryEntity.Update(entry);
            }
            await _ctx.SaveChangesAsync();
            return entry.Id;
        }

        public async Task Delete(EntryEntity entry) 
        {
            _ctx.EntryEntity.Remove(entry);
            await _ctx.SaveChangesAsync();
        }
    }
}
