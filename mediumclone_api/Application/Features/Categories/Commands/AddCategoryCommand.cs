using MediatR;

namespace mediumclone_api.Application.Features.Categories.Commands
{
    public class AddCategoryCommand : IRequest<bool>
    {
        public string Topic { get; set; } = string.Empty;
    }
}