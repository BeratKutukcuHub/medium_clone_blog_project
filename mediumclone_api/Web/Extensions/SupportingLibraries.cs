using MediatR;
using mediumclone_api.Web.Profiles;
using System;
namespace mediumclone_api.Web.Extensions;

public static class SupportingLibraries
{
    public static void SupportingLibrariesServices(this IServiceCollection _service)
    {
        _service.AddAutoMapper(config => config.AddProfile(typeof(UserMapProfile)));
    }
}