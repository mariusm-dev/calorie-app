using Calorie.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace Calorie.DAL.Contexts
{
    public class CalorieContext : DbContext
    {
        public CalorieContext(DbContextOptions<CalorieContext> options) : base(options)
        {
        }
        public DbSet<EntryEntity> EntryEntity { get; set; }
        public DbSet<UserEntity> UserEntity { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>()
               .HasIndex(au => au.EmailAddress)
               .IsUnique();
        }
    }
}
