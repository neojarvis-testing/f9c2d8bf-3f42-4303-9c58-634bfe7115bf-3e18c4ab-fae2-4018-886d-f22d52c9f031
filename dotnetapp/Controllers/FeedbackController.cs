using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Data;
using dotnetapp.Exceptions;
using Microsoft.AspNetCore.Authorization;
namespace dotnetapp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;
        public FeedbackController(FeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }
        [HttpGet]
        [Authorize(Roles= "Admin")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                if (feedbacks == null || !feedbacks.Any())
                {
                    return NotFound(new {error = "No feedback found"});
                }
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new{ error = ex.Message});
            }
        }
        [HttpGet("user/{userId}")]
<<<<<<< HEAD
        [Authorize(Roles= "User")]
=======
        [Authorize(Roles= "User,Admin")]
>>>>>>> e7139b0ee7f2973207a95c07c4bb65e0ebeb4350
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                if(userId <= 0)
                {
                    return BadRequest(new { error = "Invalid user id"});
                }
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                if(feedbacks == null || !feedbacks.Any())
                {
                    return NotFound(new {error = "No feedback found for the given user id."});
                }
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {ex.Message});
            }
        }
        [HttpPost]
        [Authorize(Roles= "User")]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                if (feedback == null)
                {
                    return BadRequest(new {error = "Feedback data is empty"});
                }
                if(!ModelState.IsValid)
                {
                    return BadRequest(new {error = "Invalid feedback data"});
                }
                await _feedbackService.AddFeedback(feedback);
                return Ok(new { message = "Feedback added successfully"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {error = ex.Message});
            }
        }
        [HttpDelete("{feedbackId}")]
        [Authorize(Roles= "User")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                if(feedbackId <= 0 )
                {
                    return BadRequest(new {error = "Invalid feedback id"});
                }
                bool isDeleted = await _feedbackService.DeleteFeedback(feedbackId);
                if (isDeleted)
                {
                    return Ok(new {message = "Feedback deleted successfully"});
                }
                else
                {
                    return NotFound( new { error = "Cannot find any feedback"});
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new {error = ex.Message});
            }
        }
    }
}