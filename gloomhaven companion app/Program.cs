using Microsoft.EntityFrameworkCore;
using gloomhaven_companion_app.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<GameEntityContext>(opt =>
    opt.UseInMemoryDatabase("gloomhaven_companion_app"));
builder.Services.AddSwaggerGen();


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

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");

// app.MapControllerRoute(
//     name: "gamecontroller",
//     pattern: "api/{controller}/{action=Index}/{id?}");

app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
