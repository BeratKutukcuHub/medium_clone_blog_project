using MediatR;
using mediumclone_api.Application.Features.Users.Commands;
using mediumclone_api.Web.Profiles;

namespace mediumclone_api.Web.Extensions;

public static class SupportingLibraries
{
    public static void SupportingLibrariesServices(this IServiceCollection _service)
    {
        _service.AddMediatR(typeof(CreateUserCommand).Assembly);

        _service.AddAutoMapper(config => config.AddProfile(typeof(UserMapProfile)));
    }
}