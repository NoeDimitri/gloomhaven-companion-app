﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace gloomhaven_companion_app.Models;

public class GameEntityContext : DbContext
{
    public GameEntityContext(DbContextOptions<GameEntityContext> options) : base(options)
    {

    }
    public DbSet<GameEntity> GameEntities { get; set; } = null!;
}