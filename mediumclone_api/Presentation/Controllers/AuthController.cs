using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Auth.Commands;
using mediumclone_api.Common.Shared;
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
        private readonly IMapper _mapper;
        public AuthController(IMediator mediatr, IHttpContextAccessor httpContext, IMapper mapper)
        {
            _mediatr = mediatr;
            _httpContext = httpContext;
            _mapper = mapper;
        }

        [HttpPost("Signin")]
        public async Task<IActionResult> Signin(SigninCommand signinDto)
        {
            var response = await _mediatr.Send(signinDto);
            _httpContext?.HttpContext?.Response.Cookies.Append(
            "x-refreshtoken",
            response.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(40),
                Secure = false, 
                SameSite = SameSiteMode.None 
            });
            return Ok(new { Token = response.Token });
        }
        [HttpPost("Refresh")]
        public async Task<IActionResult> Refresh(RefreshTokenUserInformation userInfo)
        {
            string refreshToken = _httpContext?.HttpContext?.Request?.Cookies["x-refreshtoken"];
            if (refreshToken is null)
                return Unauthorized();
            var responseValidate = await _mediatr.Send(_mapper.Map<RefreshTokenCommand>(userInfo));
            if (!responseValidate.isExpire)
                return Unauthorized();
            return Ok(responseValidate.Token);
        }
        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(SignupCommand signUpDto)
        {
            var response = await _mediatr.Send(signUpDto);
            return Ok(response);
        }
        [HttpPost("SignupMail")]
        public async Task<IActionResult> SignupMail(SignupMailCommand signupMailCommand)
        {
            var code = await _mediatr.Send(signupMailCommand);
            return Ok(code);
        }
        
    }
}