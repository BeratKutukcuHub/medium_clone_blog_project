using mediumclone_api.Application.Utilities;
using mediumclone_api.Common.Utilities;

namespace mediumclone_api.Web.Extensions
{
    public static class UtilitiesExtension
    {
        public static void UtilitiesServices(this IServiceCollection _service)
        {
            _service.AddSingleton<TokenService>();
        }
    }
}