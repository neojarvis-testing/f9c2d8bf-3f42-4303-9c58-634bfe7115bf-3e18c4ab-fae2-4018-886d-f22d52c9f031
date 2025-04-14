using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CookingClassController : ControllerBase
    {
        private readonly CookingClassService _cookingClassService;
        // Constructor for CookingClassController.
        // Initializes a new instance of the CookingClassController class
        // with the provided CookingClassService.

        public CookingClassController(CookingClassService cookingClassService)
        {
            _cookingClassService = cookingClassService;
        }
        // Retrieves all cooking class sessions.
        // GET: api/CookingClass
        // Returns a list of all cooking classes.
        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<IEnumerable<CookingClass>>> GetAllCookingClasses()
        {
            try
            {
                var classes = await _cookingClassService.GetAllCookingClasses();
                if(classes==null)
                {
                    return BadRequest(new {Message= "Cannot find cooking classes."});
                }
                return Ok(classes);
            }
            catch (Exception ex)
            {
                // Returns a 500 Internal Server Error response with the exception message.
                return StatusCode(500, new { Message = $"An error occured while fetching all the cooking classes: {ex.Message}" });
            }
        }
        // Retrieves a specific cooking class session by ID.
        // GET: api/CookingClass/{classId}
        // Parameters:
        //   classId: The ID of the cooking class to retrieve.
        // Returns a specific cooking class or a 404 Not Found response if the class does not exist.
        [HttpGet("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CookingClass>> GetCookingClassById(int classId)
        {
            try
            {
                var cookingClass = await _cookingClassService.GetCookingClassById(classId);
                if (cookingClass == null)
                    return NotFound(new { Message = "Cannot find any cooking" });
                return Ok(cookingClass);
            }
            catch (Exception ex)
            {
                // Returns a 500 Internal Server Error response with the exception message.
                return StatusCode(500, new { Message = $"An error occured while fetching the cooking class by ID: {ex.Message}" });
            }
        }
        // Adds a new cooking class.
        // POST: api/CookingClass
        // Parameters:
        //   cooking: The cooking class details to add.
        // Returns a 200 OK response if the class is added successfully or a 500 Internal Server Error response if there is a failure.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> AddCookingClass([FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.AddCookingClass(cooking);
                if (!result)
                    return BadRequest(new { Message = "Failed to add cooking class." });
                return Ok(new {Message= "Cooking class added successfully" });
            }
            catch (Exception ex)
            {
                // Returns a 500 Internal Server Error response with the exception message.
                return StatusCode(500, new { Message = $"An error occured while adding the cooking class: {ex.Message}" });
            }
        }
        // Updates an existing cooking class.
        // PUT: api/CookingClass/{classId}
        // Parameters:
        //   classId: The ID of the cooking class to update.
        //   cooking: The updated cooking class details.
        // Returns a 200 OK response if the class is updated successfully or a 404 Not Found response if the class does not exist.
        [HttpPut("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateCookingClass(int classId, [FromBody] CookingClass cooking)
        {
            try
            {
                var result = await _cookingClassService.UpdateCookingClass(classId, cooking);
                if (!result)
                    return NotFound(new { Message = "Cannot find any cooking" });
                return Ok(new {Message= "Cooking class updated successfully."});
            }
            catch (Exception ex)
            {
                // Returns a 500 Internal Server Error response with the exception message.
                return StatusCode(500, new { Message = $"An error occured while updating the cooking class: {ex.Message}" });
            }
        }
        // Deletes a cooking class session.
        // DELETE: api/CookingClass/{classId}
        // Parameters:
        //   classId: The ID of the cooking class to delete.
        // Returns a 200 OK response if the class is deleted successfully or a 404 Not Found response if the class does not exist.
        [HttpDelete("{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteCookingClass(int classId)
        {
            try
            {
                var result = await _cookingClassService.DeleteCookingClass(classId);
                if (!result)
                    return NotFound(new {Message= "Cannot find any cooking"});
                return Ok(new {Message= "Cooking class deleted successfully"});
            }
            catch (Exception ex)
            {
                // Returns a 500 Internal Server Error response with the exception message.
                return StatusCode(500, new { Message = $"An error occured while Deleting the Cooking class: {ex.Message}" });
            }
        }
    }
}