namespace mediumclone_api.Web.Extensions
{
    public static class CookieExtension
    {
        public static void CookieService(this IServiceCollection builder)
        {
            builder.AddCookiePolicy(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.Strict;
                options.Secure = CookieSecurePolicy.Always;
                options.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
            });
        }
    }
}