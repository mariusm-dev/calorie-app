using System.Collections.Generic;
using System.Threading.Tasks;
using Calorie.Services.ResponseModels;

namespace Calorie.Services
{
    public interface I_ReportService
    {
        public Task<ReportNoOfEntriesModel> GetNoOfEntries();
        public Task<List<ReportAverageCaloriesPerUserModel>> GetAverageCaloriesPerUser();
    }
}
