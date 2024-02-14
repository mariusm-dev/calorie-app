using Calorie.DAL.Entities;
using Calorie.DAL.Repositories;
using Calorie.Services.ResponseModels;
using Calorie.Services.SetModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.Services
{
    public class EntryService : I_EntryService
    {
        private readonly I_EntryRepository _repository;

        public EntryService(I_EntryRepository repository)
        {
            _repository = repository;
        }

        public async Task<EntryEntity> GetById(Guid id)
        {
            return await _repository.Get().Include(r => r.User).FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<EntryModel>> GetAllEntries()
        {
            var result = (await _repository.Get().Include(r => r.User).ToListAsync())
                 .OrderByDescending(r => r.Date)
                 .Select(r => new EntryModel
                 {
                     Id = r.Id,
                     Date = new DateTime(r.Date.Ticks, DateTimeKind.Utc),
                     Calories = r.Calories,
                     Food = r.Food,
                     User = new UserModel
                     {
                         Id = r.User.Id,
                         EmailAddress = r.User.EmailAddress,
                         CaloriesLimit = r.User.CaloriesLimit,
                         IsAdmin = r.User.IsAdmin,
                         Name = r.User.Name
                     }
                 })
                 .ToList();
                 
            return result;
        }

        public async Task<List<CurentUserEntriesModel>> GetCurrentUserEntries(Guid userId)
        {
            var result = (await _repository.Get().Where(r => r.User.Id == userId).ToListAsync())
                .OrderByDescending(r => r.Date)
                .AsEnumerable()
                .GroupBy(o => new { EventDate = new DateTime(o.Date.Date.Ticks, DateTimeKind.Utc) })
                .Select(r => new CurentUserEntriesModel
                {
                    Date = r.Key.EventDate,
                    DailyTotalCalories = r.Sum(e => e.Calories),
                    Items = r.Select(i => new EntryModel
                    {
                        Id = i.Id,
                        Date = new DateTime(i.Date.Ticks, DateTimeKind.Utc),
                        Calories = i.Calories,
                        Food = i.Food
                    }).ToList()
                })
                .ToList();

            return result;
        }

        public async Task<int> GetCurrentUserCaloriesByDate(DateTime date, Guid userId)
        {
            var result = await _repository.Get()
                .Where(r => r.User.Id == userId && r.Date.Year == date.Year && r.Date.Month == date.Month && r.Date.Day == date.Day)
                .Select(r => r.Calories)
                .SumAsync();
                
            return result;
        }

        public async Task<Guid> Save(EntrySetModel entityModel, Guid userId)
        {
            var entry = new EntryEntity { Id = entityModel.Id, Calories = entityModel.Calories, Date = entityModel.Date, Food = entityModel.Food };
            return await _repository.Save(entry, userId);
        }

        public async Task Delete(EntryEntity entry)
        {
            await _repository.Delete(entry);
        }
    }
}
