using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Calorie.Services.ResponseModels;
using Calorie.Services.SetModels;

namespace Calorie.Services
{
    public interface I_UserService
    {
        public Task<List<UserModel>> GetAll();
        public Task<UserModel> GetById(Guid id);
        public Task<string> GetNewUserToken(UserSetModel user);
    }
}
