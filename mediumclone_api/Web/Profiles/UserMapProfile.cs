using AutoMapper;
using mediumclone_api.Application.Features.Auth.Commands;
using mediumclone_api.Application.Features.Auth.Profiles;
using mediumclone_api.Application.Features.Categories.Commands;
using mediumclone_api.Application.Features.Categories.Profile;
using mediumclone_api.Application.Features.Post.Commands;
using mediumclone_api.Application.Features.Post.Profiles;
using mediumclone_api.Application.Features.Profiles;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Common.Shared;
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
        CreateMap<UserDto, User>().ReverseMap();
        CreateMap<Category, GetCategories>().ReverseMap();
        CreateMap<Category, AddCategoryCommand>().ReverseMap();
        CreateMap<User, GetUserDto>().ReverseMap();
        CreateMap<User, SignupCommand>().ReverseMap();
        CreateMap<User, SigninCommand>().ReverseMap();
        CreateMap<User, ActivateSignupCommand>().ReverseMap();
        CreateMap<Post, AddPostCommand>().ReverseMap();
        CreateMap<Post, PostGetDto>().ReverseMap();
    }
}