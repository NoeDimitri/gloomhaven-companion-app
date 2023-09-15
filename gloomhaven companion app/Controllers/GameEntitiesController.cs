using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gloomhaven_companion_app.Models;
using Humanizer.Localisation.TimeToClockNotation;
using System.ComponentModel.DataAnnotations;

namespace gloomhaven_companion_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameEntitiesController : Controller
    {
        private readonly GameEntityContext _context;

        public GameEntitiesController(GameEntityContext context)
        {
            _context = context;
        }


        #region Get API calls

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

        #endregion

        #region PUT Api calls
        // PUT: api/GameEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameEntity(long id, int newInitiative)
        {
            GameEntity selectedEntity;
            if ((selectedEntity = _context.GameEntities.Find(id)!) == null)
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

        #endregion

        #region POST Api calls
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

        // [HttpPost("{playername}")]
        // public async Task<ActionResult<GameEntity>> PostNewGameEntity(string playerName)
        // {
            
        //     if (playerName == null)
        //     {
        //         return Problem("No playername provided.");
        //     }

        //     GameEntity newEntity = new GameEntity();
        //     int numEntity = _context.GameEntities.Count<GameEntity>()+1; // Get max ID value instead of count

        //     newEntity.Id = numEntity;
        //     newEntity.EntityName = playerName;
        //     newEntity.initiative = -1;

        //     _context.GameEntities.Add(newEntity);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction("GetGameEntity", new { id = newEntity.Id }, newEntity);
        // }

        [HttpPost("CreateEntity")]
        public async Task<ActionResult<GameEntity>> backendCreateEntity([FromBody] string playerName)
        {
            
            if (playerName == null)
            {
                return Problem("No playername provided.");
            }

            GameEntity newEntity = new GameEntity();
            int numEntity = _context.GameEntities.Count<GameEntity>()+1; // Get max ID value instead of count

            newEntity.Id = numEntity;
            newEntity.EntityName = playerName;
            newEntity.initiative = -1;

            _context.GameEntities.Add(newEntity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameEntity", new { id = newEntity.Id }, newEntity);
        }

        #endregion

        #region DELETE api calls
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

        #endregion

        private bool GameEntityExists(long id)
        {
            return (_context.GameEntities?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
