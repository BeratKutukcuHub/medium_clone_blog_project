using MediatR;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class MailCommand : IRequest<Activation>
    {
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public Activation Activation { get; set; }
    }
}