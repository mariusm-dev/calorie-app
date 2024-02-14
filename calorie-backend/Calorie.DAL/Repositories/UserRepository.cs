using Calorie.DAL.Contexts;
using Calorie.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.DAL.Repositories
{
    public class UserRepository: I_UserRepository
    {
        private readonly CalorieContext _ctx;

        public UserRepository(CalorieContext ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<UserEntity> Get()
        {
            return _ctx.UserEntity.AsQueryable();
        }

        public async Task<UserEntity> Save(UserEntity user) 
        {
            var newUser = _ctx.UserEntity.Add(user);
            await _ctx.SaveChangesAsync();
            return newUser.Entity;
        }
    }
}
