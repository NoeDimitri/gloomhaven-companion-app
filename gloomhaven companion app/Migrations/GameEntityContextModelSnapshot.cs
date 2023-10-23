﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using gloomhaven_companion_app.Models;

#nullable disable

namespace gloomhaven_companion_app.Migrations
{
    [DbContext(typeof(GameEntityContext))]
    partial class GameEntityContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("gloomhaven_companion_app.Models.GameEntity", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("id"));

                    b.Property<string>("entityName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("initiative")
                        .HasColumnType("integer");

                    b.Property<bool>("isPlayer")
                        .HasColumnType("boolean");

                    b.HasKey("id");

                    b.ToTable("GameEntities");
                });
#pragma warning restore 612, 618
        }
    }
}
