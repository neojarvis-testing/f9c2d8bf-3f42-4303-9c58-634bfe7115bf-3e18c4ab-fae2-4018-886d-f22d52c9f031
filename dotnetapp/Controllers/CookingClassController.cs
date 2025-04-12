using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassController : ControllerBase
    {
        private readonly CookingClassService _cookingClassService;

        public CookingClassController(CookingClassService cookingClassService)
        {
            _cookingClassService = cookingClassService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var cookingClasses = await _cookingClassService.GetAllCookingClasses();
                return Ok(cookingClasses);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{classId}")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                {
                    return NotFound("Cannot find any cooking class");
                }
                return Ok(cookingClass);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cookingClass)
        {
            try
            {
                var result = await _cookingClassService.AddCookingClass(cookingClass);
                if (result)
                {
                    return Ok("Cooking class added successfully");
                }
                return StatusCode(500, "Failed to add cooking class");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{classId}")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (result)
                {
                    return Ok("Cooking class updated successfully");
                }
                return NotFound("Cooking class not found");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{classId}")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var result = await _cookingClassService.DeleteCookingClass(classId);
                if (result)
                {
                    return Ok("Cooking class deleted successfully");
                }
                return NotFound("Cannot find cooking class");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}