using System.Security.Claims;
using MediatR;
using mediumclone_api.Application.Features.Auth.Commands;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediatr;
        private readonly IHttpContextAccessor _httpContext;
        public AuthController(IMediator mediatr, IHttpContextAccessor httpContext)
        {
            _mediatr = mediatr;
            _httpContext = httpContext;
        }

        [HttpPost("Signin")]
        public async Task<IActionResult> Signin(SigninCommand signinDto)
        {
            var response = await _mediatr.Send(signinDto);

            return Ok(new {Token = response.Token });
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(SignupCommand signUpDto)
        {
            await _mediatr.Send(signUpDto);
            return Ok();
        }
    }
}