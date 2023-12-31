using Microsoft.EntityFrameworkCore;
using gloomhaven_companion_app.Models;
using AspAngularTemplate.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<GameEntityContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("gloomhaven_companion_app")));
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();
builder.Services.AddSingleton<updateHelperInterface, updateHelper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

}
else
{
    // URL is currently https://localhost:7229/swagger/index.html
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.MapFallbackToFile("index.html"); ;
app.MapHub<updateHub>("/updateHub");

app.Run();
