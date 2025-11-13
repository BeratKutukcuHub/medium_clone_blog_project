using MediatR;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class ConfirmCommand : IRequest<bool>
    {
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public DateTime ExpireAt { get; set; } = DateTime.UtcNow;
    }
}