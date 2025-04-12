using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using dotnetapp.Exceptions;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class CookingClassRequestController : ControllerBase
{
    private readonly CookingClassRequestService _cookingClassRequestService;

    public CookingClassRequestController(CookingClassRequestService cookingClassRequestService)
    {
        _cookingClassRequestService = cookingClassRequestService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CookingClassRequest>>> GetAllCookingRequests()
    {
        var requests = await _cookingClassRequestService.GetAllCookingClassRequests();
        if (requests == null)
        {
            return NotFound();
        }
        return Ok(requests);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CookingClassRequest>> GetCookingClassById(int id)
    {
        var request = await _cookingClassRequestService.GetCookingClassRequestsByUserId(id);
        if (request == null)
        {
            return NotFound();
        }
        return Ok(request);
    }

    [HttpPost]
    public async Task<ActionResult> AddCookingClassesRequests([FromBody] CookingClassRequest request)
    {
        var result = await _cookingClassRequestService.AddCookingClassRequest(request);
        if (!result)
        {
            return BadRequest("Failed to add cooking class request.");
        }
        return Ok("Cooking class request added successfully.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCookingClassesRequests(int id, [FromBody] CookingClassRequest request)
    {
        var result = await _cookingClassRequestService.UpdateCookingClassRequest(id, request);
        if (!result)
        {
            return BadRequest("Failed to update cooking class request.");
        }
        return Ok("Cooking class request updated successfully.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCookingClassRequest(int id)
    {
        try
        {
            var result = await _cookingClassRequestService.DeleteCookingClassRequest(id);
            if (!result)
            {
                return NotFound("Cannot find the request.");
            }
            return Ok("Cooking class request deleted successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
