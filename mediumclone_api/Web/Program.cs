using MediatR;
using mediumclone_api.Presentation.Controllers;
using mediumclone_api.Web.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddApplicationPart(typeof(UserController).Assembly);
builder.Services.AddRouting();
builder.Services.AddEndpointsApiExplorer();
builder.Services.UtilitiesServices();
builder.Services.SupportingLibrariesServices();
builder.Services.CorsService();
builder.Services.AuthenticationCookie(builder.Configuration);
builder.Services.AuthorizationCookie();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpsRedirection(config => config.HttpsPort = 7232);
builder.Services.AddMemoryCache();
builder.Services.AddRateLimiter();


builder.Services.AllServices();
var app = builder.Build();

app.UseRouting();
app.UseCors();
app.UseCookiePolicy();
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


