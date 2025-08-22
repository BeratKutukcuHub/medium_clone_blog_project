using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Domain.Entities;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Commands.Users.Handlers;

public class UpdateUserHandler : IRequestHandler<UpdateUserCommand,string>
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _user;

    public UpdateUserHandler(IUserRepository user, IMapper mapper)
    {
        _user = user;
        _mapper = mapper;
    }

    public async Task<string> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<User>(request);
        await _user.UpdateEntiy(user.Id, user);
        return user.Id;
    }
}
