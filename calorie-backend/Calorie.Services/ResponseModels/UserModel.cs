using System;

namespace Calorie.Services.ResponseModels
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string EmailAddress { get; set; }
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public int CaloriesLimit { get; set; }
    }
}
