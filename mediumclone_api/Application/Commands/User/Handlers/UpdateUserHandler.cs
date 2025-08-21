using MediatR;
using mediumclone_api.Application.Extensions;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Commands.User.Handlers;

public class UpdateUserHandler : IRequestHandler<UpdateUserCommand,Unit>
{
    private readonly IServiceProvider _service;
    private readonly IUserRepository _user;

    public UpdateUserHandler(IUserRepository user, IServiceProvider service)
    {
        _user = user;
        _service = service;
    }

    public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = this.EntityResponse<UpdateUserCommand, Domain.Entities.User>(request, _service);
        await _user.UpdateEntiy(user.Id, user);
        return Unit.Value;
    }
}
