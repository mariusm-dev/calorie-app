using System;
using System.Collections.Generic;

namespace Calorie.Services.ResponseModels
{
    public class CurentUserEntriesModel
    {
        public DateTime Date { get; set; }
        public int DailyTotalCalories { get; set; }
        public IEnumerable<EntryModel> Items { get; set; }
    }
}
