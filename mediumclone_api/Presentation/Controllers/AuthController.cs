using MediatR;
using mediumclone_api.Application.Features.Auth.Commands;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediatr;

        public AuthController(IMediator mediatr)
        {
            _mediatr = mediatr;
        }

        [HttpPost("Signin")]
        public async Task<IActionResult> Signin(SigninCommand signinDto)
        {
            var token = await _mediatr.Send(signinDto);
            return Ok(token);
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(SignupCommand signUpDto)
        {
            var token = await _mediatr.Send(signUpDto);
            return Ok(token);
        }
    }
}