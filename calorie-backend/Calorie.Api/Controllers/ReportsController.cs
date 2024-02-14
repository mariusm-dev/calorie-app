using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Calorie.Services;

namespace Calorie.Api.Controllers
{
    [Authorize(Policy = "AdminOnly")]
    [ApiController]
    [Route("[controller]")]
    public class ReportsController : CaloriesBaseController
    {
        private readonly ILogger<ReportsController> _logger;
        private readonly I_ReportService _service;

        public ReportsController(ILogger<ReportsController> logger, I_ReportService service)
        {
            _logger = logger;
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet("GetNoOfEntries")]
        public async Task<IActionResult> GetNoOfEntries()
        {
            return Ok(await _service.GetNoOfEntries());
        }

        [HttpGet("GetAverageCaloriesPerUser")]
        public async Task<IActionResult> GetAverageCaloriesPerUser()
        {
            return Ok(await _service.GetAverageCaloriesPerUser());
        }
    }
}
