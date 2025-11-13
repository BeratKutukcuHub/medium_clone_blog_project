using MediatR;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class LogoutCommand : IRequest<bool>
    {
        public string Id { get; set; }
    }
}