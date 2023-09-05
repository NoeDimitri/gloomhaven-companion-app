using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gloomhaven_companion_app.Models;
using Humanizer.Localisation.TimeToClockNotation;

namespace gloomhaven_companion_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameEntitiesController : ControllerBase
    {
        private readonly GameEntityContext _context;

        public GameEntitiesController(GameEntityContext context)
        {
            _context = context;
        }

        // GET: api/GameEntities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameEntity>>> GetGameEntities()
        {
          if (_context.GameEntities == null)
          {
              return NotFound();
          }
            return await _context.GameEntities.ToListAsync();
        }

        [HttpGet("sorted")]
        public async Task<ActionResult<IEnumerable<GameEntity>>> GetSortedGameEntities()
        {
            if (_context.GameEntities == null)
            {
                return NotFound();
            }
            return await _context.GameEntities.OrderBy(x => x.initiative).ToListAsync();
        }

        // GET: api/GameEntities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameEntity>> GetGameEntity(long id)
        {
          if (_context.GameEntities == null)
          {
              return NotFound();
          }
            var gameEntity = await _context.GameEntities.FindAsync(id);

            if (gameEntity == null)
            {
                return NotFound();
            }

            return gameEntity;
        }

        // PUT: api/GameEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameEntity(long id, int newInitiative)
        {
            GameEntity selectedEntity;
            if ((selectedEntity = _context.GameEntities.Find(id)) == null)
            {
                return BadRequest();
            }

            selectedEntity.initiative = newInitiative;

            _context.Entry(selectedEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameEntityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GameEntities
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameEntity>> PostGameEntity(GameEntity gameEntity)
        {
          if (_context.GameEntities == null)
          {
              return Problem("Entity set 'GameEntityContext.GameEntities'  is null.");
          }
            _context.GameEntities.Add(gameEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameEntity", new { id = gameEntity.Id }, gameEntity);
        }

        [HttpPost("CreateNewPlayer")]
        public async Task<ActionResult<GameEntity>> PostNewGameEntity(string entityName)
        {
            if (entityName == null)
            {
                return Problem("No playername provided.");
            }

            GameEntity newEntity = new GameEntity();
            int numEntity = _context.GameEntities.Count<GameEntity>()+1;

            newEntity.Id = numEntity;
            newEntity.EntityName = entityName;
            newEntity.initiative = -1;

            _context.GameEntities.Add(newEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameEntity", new { id = newEntity.Id }, newEntity);
        }

        // DELETE: api/GameEntities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGameEntity(long id)
        {
            if (_context.GameEntities == null)
            {
                return NotFound();
            }
            var gameEntity = await _context.GameEntities.FindAsync(id);
            if (gameEntity == null)
            {
                return NotFound();
            }

            _context.GameEntities.Remove(gameEntity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameEntityExists(long id)
        {
            return (_context.GameEntities?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
