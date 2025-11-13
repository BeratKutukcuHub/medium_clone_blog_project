using MediatR;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Features.Auth.Commands.Handlers
{
    public class ConfirmCommandHandler : IRequestHandler<ConfirmCommand, bool>
    {
        IActivationRepository _activation;
        public ConfirmCommandHandler(IActivationRepository activation)
        {
            _activation = activation;
        }

        public async Task<bool> Handle(ConfirmCommand request, CancellationToken cancellationToken)
        {
            var activation = await _activation.ActivationCheckerAsync(request.Email);
            if (activation == null)
            throw new Exception("Geçersiz email");

            if (activation.Token != request.Token)
                throw new Exception("Token geçersiz");

            if (activation.ExpireAt <= DateTime.UtcNow)
                throw new Exception("Token süresi dolmuş");
            activation.IsUsed = true;
            await _activation.UpdateEntiy(activation.Id, activation);
            return true;
        }
    }
}