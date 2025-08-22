using MediatR;

namespace mediumclone_api.Application.Features.Users.Commands;

public class DeleteUserCommand : IRequest<string>
{
    public string Id { get; set; }
}