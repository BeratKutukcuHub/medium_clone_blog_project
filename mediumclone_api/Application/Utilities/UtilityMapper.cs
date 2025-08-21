using AutoMapper;

namespace mediumclone_api.Application.Utilities;

public class UtilityMapper<TCommandOrQuery, TEntity>
{
    private readonly IMapper _mapper;

    public UtilityMapper(IMapper mapper)
    {
        _mapper = mapper;
    }
    public TCommandOrQuery CommandAndQueryMapResponse(TEntity command)
    {
        var mapCommand = _mapper.Map<TCommandOrQuery>(command);
        return mapCommand;
    }
    public TEntity EntityMapResponse(TCommandOrQuery entity)
    {
        var mapCommand = _mapper.Map<TEntity>(entity);
        return mapCommand;
    }    
}