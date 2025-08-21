using MediatR;
using mediumclone_api.Application.Commands.User;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;
    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand userDto)
    {
        await _mediator.Send(userDto);
        return Ok(new { message = "The user is created." });
    }
}