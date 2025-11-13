using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Auth.Commands;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Application.Utilities;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Concreties;
using mediumclone_api.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        TokenService _tokenService;
        IHttpContextAccessor _httpContextAccessor;
        IMediator _mediator;
        IMapper _mapper;
        public AuthController(TokenService tokenService, IMediator mediator,
         IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _tokenService = tokenService;
            _mediator = mediator;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        [HttpPost("signupverify")]
        public async Task<IActionResult> SignupWithVerify(ActivateSignupCommand activateSignupCommand)
        {
            User response = await _mediator.Send(activateSignupCommand);
            if (response != null)
            {
                _httpContextAccessor.HttpContext.Response.Cookies.Append("x-token",
                _tokenService.GetToken(response).token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTimeOffset.UtcNow.AddDays(7)
                });
                return Ok(response);
            }
            return BadRequest();
        }
        [HttpPost("signup")]
        public async Task<IActionResult> Signup(SignupCommand signupCommand)
        {
            var signup = await _mediator.Send(signupCommand);
            var user = _mapper.Map<User>(signup);
            _httpContextAccessor.HttpContext.Response.Cookies.Append("x-token", _tokenService.GetToken(user).token,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(60)
            });
            return Ok(signup);
        }
        [HttpPost("signin")]
        public async Task<IActionResult> Signin(SigninCommand signinCommand)
        {
            var signin = await _mediator.Send(signinCommand);
            var user = _mapper.Map<User>(signin);
            _httpContextAccessor.HttpContext.Response.Cookies.Append("x-token", _tokenService.GetToken(user).token,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(60)
            });
            return signin != null ? Ok(signin) : NotFound();
        }
        [Authorize(Policy = "Policy", Roles = "User")]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout(LogoutCommand logoutCommand)
        {
            var response = await _mediator.Send(logoutCommand);
            return response ? Ok() : Unauthorized(); 
        }
        [Authorize(Policy = "Policy", Roles = "User")]
        [HttpPost("me")]
        public async Task<IActionResult> MeAsync(MeCommand meCommand)
        {
            var responseCheck = await _mediator.Send(meCommand);
            return responseCheck.isOk ? Ok(responseCheck.User) : Unauthorized();
        }
    }
}