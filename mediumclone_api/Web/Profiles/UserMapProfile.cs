using AutoMapper;
using mediumclone_api.Application.Commands.User;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Web.Profiles;

public class UserMapProfile : Profile
{
    public UserMapProfile()
    {
        CreateMap<CreateUserCommand, User>().ReverseMap();
        CreateMap<UpdateUserCommand, User>().ReverseMap();
    }
}