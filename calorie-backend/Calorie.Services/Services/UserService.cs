using Calorie.DAL.Entities;
using Calorie.DAL.Repositories;
using Calorie.Services.ResponseModels;
using Calorie.Services.SetModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Calorie.Services
{
    public class UserService : I_UserService
    {
        private readonly I_UserRepository _repository;
        private readonly IConfiguration _config;

        public UserService(I_UserRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config ?? throw new ArgumentNullException(nameof(config));
        }

        public async Task<List<UserModel>> GetAll()
        {
            return await _repository.Get()
                .Select(r => new UserModel
                {
                    Id = r.Id,
                    EmailAddress = r.EmailAddress,
                    CaloriesLimit = r.CaloriesLimit,
                    IsAdmin = r.IsAdmin,
                    Name = r.Name
                })
                .ToListAsync();
        }

        public async Task<UserModel> GetById(Guid id)
        {
            var r = await _repository.Get().FirstOrDefaultAsync(r => r.Id == id);
            return new UserModel
            {
                Id = r.Id,
                EmailAddress = r.EmailAddress,
                CaloriesLimit = r.CaloriesLimit,
                IsAdmin = r.IsAdmin,
                Name = r.Name
            };
        }

        public async Task<string> GetNewUserToken(UserSetModel user) 
        {
            var existingUser = await _repository.Get().FirstOrDefaultAsync(r => r.EmailAddress == user.EmailAddress);
            if (existingUser != null) 
            {
                return GenerateToken(existingUser);
            }            

            var newUser = new UserEntity();
            newUser.EmailAddress = user.EmailAddress;
            newUser.Name = user.Name;
            newUser.CaloriesLimit = 2100;
            newUser.IsAdmin = false;
            var savedUser = await  _repository.Save(newUser);
            return GenerateToken(savedUser);
        }

        private string GenerateToken(UserEntity newUser) 
        {
            var jwtAppSettingOptions = _config.GetSection("JWT");
            List<Claim> claims = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub, newUser.Id.ToString()),
                new Claim("isAdmin", "false"),
            };

            var token = new JwtSecurityToken
            (
                issuer: jwtAppSettingOptions["Issuer"],
                audience: jwtAppSettingOptions["Audience"],
                claims: claims,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtAppSettingOptions["Key"])), SecurityAlgorithms.HmacSha256)
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
