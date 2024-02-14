using System;

namespace Calorie.Services.ResponseModels
{
    public class EntryModel
    {
        public Guid Id { get; set; }
        public UserModel User { get; set; }
        public DateTime Date { get; set; }
        public string Food { get; set; }
        public int Calories { get; set; }
    }
}
