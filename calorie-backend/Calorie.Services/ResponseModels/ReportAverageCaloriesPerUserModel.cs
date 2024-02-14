namespace Calorie.Services.ResponseModels
{
    public class ReportAverageCaloriesPerUserModel
    {
        public UserModel User { get; set; }
        public double AverageCaloriesPerDayInPastSevenDays { get; set; }
    }
}
