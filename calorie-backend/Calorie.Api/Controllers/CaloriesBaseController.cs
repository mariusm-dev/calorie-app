using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Calorie.Api.Controllers
{
    public class CaloriesBaseController : ControllerBase
    {
        public Guid userId
        {
            get
            {
                if (User != null)
                {
                    return Guid.Parse(User.Claims.FirstOrDefault().Value);
                }
                return Guid.Empty;
            }
        }

        public bool isAdmin
        {
            get
            {
                if (User != null)
                {
                    return bool.Parse(User.Claims.FirstOrDefault(r => r.Type == "isAdmin").Value);
                }
                return false;
            }
        }
    }
}
