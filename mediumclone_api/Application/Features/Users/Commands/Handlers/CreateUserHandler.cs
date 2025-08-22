using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Commands.Users.Handlers;

public class CreateUserHandler : IRequestHandler<CreateUserCommand,CreateUserResponse>
{
    private readonly IUserRepository _user;
    private readonly IMapper _mapper;

    public CreateUserHandler(IUserRepository user,IMapper mapper)
    {
        _user = user;
        _mapper = mapper;
    }

    public async Task<CreateUserResponse> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<Domain.Entities.User>(request);
        await _user.InsertEntity(user);
        return _mapper.Map<CreateUserResponse>(user);
    }
}