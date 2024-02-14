using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Calorie.DAL.Entities;
using Calorie.Services.ResponseModels;
using Calorie.Services.SetModels;

namespace Calorie.Services
{
    public interface I_EntryService
    {
        public Task<EntryEntity> GetById(Guid id);
        public Task<List<EntryModel>> GetAllEntries();
        public Task<List<CurentUserEntriesModel>> GetCurrentUserEntries(Guid userId);
        public Task<int> GetCurrentUserCaloriesByDate(DateTime date, Guid userId);
        public Task<Guid> Save(EntrySetModel entityModel, Guid userId);
        public Task Delete(EntryEntity entry);
    }
}
