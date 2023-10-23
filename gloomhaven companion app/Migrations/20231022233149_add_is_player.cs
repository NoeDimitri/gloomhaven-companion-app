using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gloomhaven_companion_app.Migrations
{
    /// <inheritdoc />
    public partial class add_is_player : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPlayer",
                table: "GameEntities",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isPlayer",
                table: "GameEntities");
        }
    }
}
