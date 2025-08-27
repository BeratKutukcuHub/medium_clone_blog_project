namespace mediumclone_api.Web.Extensions
{
    public static class CorsExtension
    {
        public static void CorsService(this IServiceCollection _service)
        {
            _service.AddCors(setupAction: setup =>
            {
                setup.AddDefaultPolicy(configurePolicy: config =>
                {
                    config.AllowAnyHeader();
                    config.AllowAnyMethod();
                    config.WithOrigins("http://localhost:5173");
                    config.AllowCredentials();
                });
            });
        }
    }
}