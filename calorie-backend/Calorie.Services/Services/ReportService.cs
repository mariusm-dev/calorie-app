using Calorie.DAL.Repositories;
using Calorie.Services.ResponseModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.Services
{
    public class ReportService : I_ReportService
    {
        private readonly I_EntryRepository _entryRepository;
        private readonly I_UserRepository _userRepository;

        public ReportService(I_EntryRepository entryRepository, I_UserRepository userRepository)
        {
            _userRepository = userRepository;
            _entryRepository = entryRepository;

        }

        public async Task<ReportNoOfEntriesModel> GetNoOfEntries()
        {
            var lastSevenDaysEntries = await _entryRepository.Get().Where(r => r.Date >= DateTime.UtcNow.AddDays(-7)).CountAsync();
            var previousSevenDaysEntries = await _entryRepository.Get().Where(r => r.Date >= DateTime.UtcNow.AddDays(-14) && r.Date < DateTime.UtcNow.AddDays(-7)).CountAsync();
            return new ReportNoOfEntriesModel(lastSevenDaysEntries, previousSevenDaysEntries);
        }

        public async Task<List<ReportAverageCaloriesPerUserModel>> GetAverageCaloriesPerUser()
        {
            return await _userRepository.Get()
                .Include(r => r.Entries)
                .Select(r => new ReportAverageCaloriesPerUserModel
                {
                    User = new UserModel
                    {
                        Id = r.Id,
                        CaloriesLimit = r.CaloriesLimit,
                        EmailAddress = r.EmailAddress,
                        IsAdmin = r.IsAdmin,
                        Name = r.Name
                    },
                    AverageCaloriesPerDayInPastSevenDays = r.Entries.Where(e => e.Date >= DateTime.UtcNow.AddDays(-7)).Any() ?
                                r.Entries.Where(e => e.Date >= DateTime.UtcNow.AddDays(-7)).Average(e => e.Calories) : 0

                })
                .OrderBy(r => r.User.EmailAddress)
                .ToListAsync();
        }
    }
}
