using mediumclone_api.Infrastructure.Interfaces;
using mediumclone_ui.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User userDto)
    {
        await _userRepository.AddUser(userDto);
        return Ok(new { Message = "User created" });
    }
}