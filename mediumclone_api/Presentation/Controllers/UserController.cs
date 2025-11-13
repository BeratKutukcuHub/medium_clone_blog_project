using MediatR;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Application.Features.Users.Queries;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize(Policy = "Policy", Roles = "User")]
    [HttpGet]
    public async Task<IActionResult> GetAllUserEntities()
    {
        var response = await _mediator.Send(new GetAllUserQuery());
        return Ok(response);
    }
    [Authorize(Policy = "Policy", Roles = "User")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var response = await _mediator.Send(new GetByIdUserQuery { Id = id });
        return Ok(response);
    }
    [Authorize(Policy = "Policy", Roles = "User")]
    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserCommand createUserCommand)
    {
        var response = await _mediator.Send(createUserCommand);
        return Ok(new { Message = "The user created", Response = response });
    }
    [Authorize(Policy = "Policy", Roles = "User")]
    [HttpPut]
    public async Task<IActionResult> UpdateUser(UpdateUserCommand updateUserCommand)
    {
        var id = await _mediator.Send(updateUserCommand);
        return Ok(id);
    }
    [Authorize(Policy = "Policy", Roles = "User")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var userId = await _mediator.Send(new DeleteUserCommand{ Id = id });
        return Ok(userId);
    }
}