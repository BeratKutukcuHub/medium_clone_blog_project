using MediatR;
using mediumclone_api.Application.Extensions;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Commands.User.Handlers;

public class CreateUserHandler : IRequestHandler<CreateUserCommand,Unit>
{
    private readonly IServiceProvider _service;
    private readonly IUserRepository _user;

    public CreateUserHandler(IUserRepository user,
     IServiceProvider service)
    {
        _user = user;
        _service = service;
    }

    public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var map = this.EntityResponse<CreateUserCommand, Domain.Entities.User>(request, _service);
        await _user.InsertEntity(map);
        return Unit.Value;
    }
}