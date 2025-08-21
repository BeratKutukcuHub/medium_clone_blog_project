using AutoMapper;
using MediatR;
using mediumclone_api.Application.Utilities;
using Microsoft.Extensions.DependencyInjection;

namespace mediumclone_api.Application.Extensions;

public static class MapperExtension
{
    public static TCommand CommandAndQueryMapResponse<TCommand, TEntity>(this IRequestHandler<TCommand,Unit> _request,
     TEntity entity,
     IServiceProvider _service) where TCommand : IRequest
    {
        IMapper map = _service.GetRequiredService<IMapper>();
        var mapCommand = map.Map<TCommand>(entity);
        return mapCommand;
    }
    
    public static TEntity EntityResponse<TCommand, TEntity>(this IRequestHandler<TCommand,Unit> _request,
     TCommand command,
     IServiceProvider _service) where TCommand : IRequest
    {
        IMapper map = _service.GetRequiredService<IMapper>();
        var mapCommand = map.Map<TEntity>(command);
        return mapCommand;
    }
}