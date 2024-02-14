using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Calorie.Services;
using Calorie.Services.SetModels;

namespace Calorie.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntryController : CaloriesBaseController
    {
        private readonly ILogger<EntryController> _logger;
        private readonly I_EntryService _service;

        public EntryController(ILogger<EntryController> logger, I_EntryService service)
        {
            _logger = logger;
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<IActionResult> GetAllEntries()
        {
            var result = await _service.GetAllEntries();
            return Ok(result);
        }

        [HttpGet("CurrentUserEntries")]
        public async Task<IActionResult> GetCurrentUserEntries()
        {
            var result = await _service.GetCurrentUserEntries(userId);
            return Ok(result);
        }

        [HttpGet("CurrentUserCaloriesByDate")]
        public async Task<IActionResult> GetCurrentUserCaloriesByDate(DateTime date)
        {
            var result = await _service.GetCurrentUserCaloriesByDate(date, userId);
            return  Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Save(EntrySetModel entryModel)
        {
            var result = await _service.Save(entryModel, userId);
            return Ok(result);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("AdminSave")]
        public async Task<IActionResult> AdminSave(AdminEntrySetModel entryModel)
        {
            var result = await _service.Save(entryModel, entryModel.User.Value);
            return Ok(result);
        }

        [HttpDelete("{entryId}")]
        public async Task<IActionResult> Save(Guid entryId)
        {
            var entry = await _service.GetById(entryId);
            if (entry == null) 
            {
                return NotFound();
            }
            if (!isAdmin && entry.User.Id != userId)
            {
                return Forbid("You are not authoried to delete entries for other users");
            }
            await _service.Delete(entry);
            return Ok();
        }
    }
}
