namespace gloomhaven_companion_app.Models;

public class GameEntity
{

	public long id { get; set; }
	public string entityName { get; set; } = null!; // Quick fix so it stops throwing errors at me reee
	public int initiative { get; set; }
	public bool isPlayer { get; set; }


}
