namespace Calorie.Services.ResponseModels
{
    public class ReportNoOfEntriesModel
    {
        public int LastSevenDaysEntries { get; set; }
        public int PreviousSevenDaysEntries { get; set; }

        public ReportNoOfEntriesModel(int lastSevenDaysEntries, int previousSevenDaysEntries) 
        {
            LastSevenDaysEntries = lastSevenDaysEntries;
            PreviousSevenDaysEntries = previousSevenDaysEntries;
        }
    }
}
