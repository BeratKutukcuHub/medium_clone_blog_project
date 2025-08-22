using AutoMapper;
using MediatR;
using mediumclone_api.Application.Utilities;
using Microsoft.Extensions.DependencyInjection;

namespace mediumclone_api.Application.Extensions;

public static class MapperExtension
{
    public static TCommand CommandQueryResponse<TCommand, DTO>(this IRequestHandler<TCommand, DTO> request,
    DTO dto,
    IServiceProvider _service
    ) where TCommand : IRequest<DTO>
    {
        IMapper map = _service.GetRequiredService<IMapper>();
        return map.Map<TCommand>(dto);
    }

    public static DTO DTOResponse<TCommand, DTO>(this IRequestHandler<TCommand, DTO> request,
    TCommand commandOrQuery,
    IServiceProvider _service
    ) where TCommand : IRequest<DTO>
    {
        IMapper map = _service.GetRequiredService<IMapper>();
        return map.Map<DTO>(commandOrQuery);
    }

    public static TEntity EntityResponse<TCommand, DTO, TEntity>(this IRequestHandler<TCommand, DTO> request,
    TCommand commandOrQuery, IServiceProvider _service) where TCommand : IRequest<DTO>
    {
        IMapper map = _service.GetRequiredService<IMapper>();
        return map.Map<TEntity>(commandOrQuery);
    }
}