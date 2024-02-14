using Calorie.DAL.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Calorie.DAL.Repositories
{
    public interface I_UserRepository
    {
        public IQueryable<UserEntity> Get();
        public Task<UserEntity> Save(UserEntity user);
    }
}
