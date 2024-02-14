using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Calorie.Services;
using Calorie.Services.SetModels;

namespace Calorie.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : CaloriesBaseController
    {
        private readonly ILogger<UserController> _logger;
        private readonly I_UserService _service;

        public UserController(ILogger<UserController> logger, I_UserService service)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAll();
            return Ok(users);
        }

        [HttpGet("CurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var user = await _service.GetById(userId);
            return Ok(user);
        }

        [HttpPost("GetNewUserToken")]
        public async Task<IActionResult> GenerateToken([FromBody] UserSetModel newUser)
        {
            var tokenString = await _service.GetNewUserToken(newUser);
            return Ok(new { token = tokenString});
        }
    }
}
