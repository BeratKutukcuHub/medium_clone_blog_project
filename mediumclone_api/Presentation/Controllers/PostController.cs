using System.Data.Common;
using MediatR;
using mediumclone_api.Application.Features.Post.Commands;
using mediumclone_api.Application.Features.Post.Queries;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PostController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetPost(string Id)
        {
            var response = await _mediator.Send(new GetPostCommand()
            {
                Id = Id
            });
            return Ok(response);
        }
        [HttpGet("posts")]
        public async Task<IActionResult> GetPosts()
        {
            var response = await _mediator.Send(new GetAllPostQuery());
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> PostPost(AddPostCommand addPostCommand)
        {
            var response = await _mediator.Send(addPostCommand);
            if (response)
            {
                return Ok();
            }
            return BadRequest();
        }
        [HttpDelete]
        public async Task<IActionResult> RemovePost(DeletePostCommand deletePostCommand)
        {
            var response = await _mediator.Send(deletePostCommand);
            if (response) return Ok();
            return BadRequest();
        }
    }
}