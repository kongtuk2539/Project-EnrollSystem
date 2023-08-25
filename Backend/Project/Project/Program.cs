using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Project.Helper.Authorize;
using Project.Models.Authorize;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// configure strongly typed settings object
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

var config = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthentication();
app.UseAuthorization();

// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();

