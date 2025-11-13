using MediatR;
using mediumclone_api.Application.Features.Auth.Commands;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VerifyController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VerifyController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendMail(MailCommand mailCommand)
        {
            var response = await _mediator.Send(mailCommand);
            return Ok(new {isSuccess = response});
        }
        [HttpPost("confirm")]
        public async Task<IActionResult> ConfirmMail(ConfirmCommand confirm)
        {
            bool response = await _mediator.Send(confirm);
            if (!response) return Unauthorized();
            return Ok();
        }
    }
    
}