using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace gloomhaven_companion_app.Migrations
{
    /// <inheritdoc />
    public partial class temp_initiative : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "temp_initiative",
                table: "GameEntities",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "temp_initiative",
                table: "GameEntities");
        }
    }
}
