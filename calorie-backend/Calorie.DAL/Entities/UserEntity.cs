using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Calorie.DAL.Entities
{
    public class UserEntity
    {
        [Key]
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public bool IsAdmin { get; set; }
        [Required]
        public int CaloriesLimit { get; set; }
        public ICollection<EntryEntity> Entries { get; set; }
    }
}
