using MediatR;
using mediumclone_api.Common.Shared;

namespace mediumclone_api.Application.Features.Auth.Commands
{
    public class SignupMailCommand : IRequest<ActivationDto>
    {
        public string Email { get; set; } = string.Empty;
    }
}