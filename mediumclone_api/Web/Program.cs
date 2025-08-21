using mediumclone_api.Presentation.Controllers;
using mediumclone_api.Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddApplicationPart(typeof(UserController).Assembly);
builder.Services.AddRouting();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpsRedirection(config => config.HttpsPort = 7232);
builder.Services.AddMemoryCache();
builder.Services.AddRateLimiter();
builder.Services.AddCookiePolicy(config =>
{
    config.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
    config.Secure = CookieSecurePolicy.SameAsRequest;
});
builder.Services.SupportingLibrariesServices();
builder.Services.AllServices();
var app = builder.Build();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

if (app.Environment.IsDevelopment())
{
    app.MapControllers();
    app.MapSwagger();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.Run();


