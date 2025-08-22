using AutoMapper;
using mediumclone_api.Application.Features.Auth.Commands;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Domain.Entities;

namespace mediumclone_api.Web.Profiles;

public class UserMapProfile : Profile
{
    public UserMapProfile()
    {
        CreateMap<CreateUserCommand, User>().ReverseMap();
        CreateMap<UpdateUserCommand, User>().ReverseMap();
        CreateMap<CreateUserResponse, User>().ReverseMap();
        CreateMap<GetUserResponse, User>().ReverseMap();
        CreateMap<SignupCommand, User>().ReverseMap();
    }
}