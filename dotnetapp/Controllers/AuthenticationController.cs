using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthService _authService;

        public  AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.Login(model);
            if (result.Item1 == 1)
            {
                 return Ok(new { Token = result.Item2 });
            }
                return StatusCode(500, result.Item2);

            
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _authService.Register(model, model.UserRole);
            if (result.Item1 == 1)
            {
                return Ok("User registered successfully.");
            }
            return StatusCode(500, result.Item2);
        }
    }
}

