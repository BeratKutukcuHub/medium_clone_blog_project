using MediatR;
using mediumclone_api.Application.Features.Categories.Commands;
using mediumclone_api.Application.Features.Categories.Queries;
using Microsoft.AspNetCore.Mvc;

namespace mediumclone_api.Presentation.Controllers
{
    [ApiController]
    [Route("api/Categories")]
    public class CategoryController : ControllerBase
    {
        IMediator _mediatr;

        public CategoryController(IMediator mediatr)
        {
            _mediatr = mediatr;
        }
        [HttpPost]
        public async Task<IActionResult> PostCategoryAsync(AddCategoryCommand addCategoryCommand)
        {
            var response = await _mediatr.Send(addCategoryCommand);
            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetCategoriesAsync([FromQuery]GetCategoriesQuery getCategoriesQuery)
        {
            var response = await _mediatr.Send(getCategoriesQuery);
            return Ok(response);
        }
    }
}