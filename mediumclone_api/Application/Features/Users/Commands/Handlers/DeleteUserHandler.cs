using AutoMapper;
using MediatR;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Infrastructure.Interfaces;

namespace mediumclone_api.Application.Commands.Users.Handlers;

public class DeleteUserHandler : IRequestHandler<DeleteUserCommand, string>
{
    private readonly IUserRepository _userRepository;

    public DeleteUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<string> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        await _userRepository.DeleteEntity(request.Id);
        return request.Id;
    }
}