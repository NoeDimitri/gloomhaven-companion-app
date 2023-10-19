using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace gloomhaven_companion_app.Models;

public class GameEntityContext : DbContext
{
/*    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Database=gloomhaven_db;Username=gloomman;Password=gloomers");*/
    public GameEntityContext(DbContextOptions<GameEntityContext> options) : base(options)
    {

    }
    public DbSet<GameEntity> GameEntities { get; set; } = null!;
}