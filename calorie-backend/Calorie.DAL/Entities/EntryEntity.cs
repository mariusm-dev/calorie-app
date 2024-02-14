using System;
using System.ComponentModel.DataAnnotations;

namespace Calorie.DAL.Entities
{
    public class EntryEntity
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public UserEntity User{ get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Food { get; set; }
        [Required]
        public int Calories { get; set; }
    }
}
