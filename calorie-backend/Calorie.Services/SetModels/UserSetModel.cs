using System.ComponentModel.DataAnnotations;

namespace Calorie.Services.SetModels
{
    public class UserSetModel
    {
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
