using System;
using System.ComponentModel.DataAnnotations;

namespace Calorie.Services.SetModels
{
    public class EntrySetModel
    {
        public Guid Id { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Food { get; set; }
        [Required]
        public int Calories { get; set; }
    }

    public class AdminEntrySetModel: EntrySetModel
    {
        [Required]
        public Guid? User { get; set; }
    }
}
