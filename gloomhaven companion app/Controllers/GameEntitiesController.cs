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
using Microsoft.AspNetCore.SignalR;
using AspAngularTemplate.Hubs;

namespace gloomhaven_companion_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameEntitiesController : Controller
    {
        private readonly GameEntityContext _context;
        private readonly IHubContext<updateHub> _hubContext;  
        private readonly updateHelperInterface _updateHelper;

        public GameEntitiesController(GameEntityContext context, IHubContext<updateHub> hubContext, updateHelperInterface updateHelper)
        {
            _context = context;
            _hubContext = hubContext;
            _updateHelper = updateHelper;
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

        [HttpGet("num-ready")]
        public async Task<int> GetReadyPlayers()
        {
            var numReady = await _context.GameEntities.CountAsync(o => o.temp_initiative != -1);
            return numReady;
        }

        #endregion

        #region PUT Api calls
        // PUT: api/GameEntities/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("resetInitiative")]
        public async Task<ActionResult<IEnumerable<GameEntity>>> resetInitiatives(){

            var entities = await _context.GameEntities.ToListAsync();

            // temporary LAME fix
            foreach (var entity in entities){
                entity.initiative = -1;
            }

            // why this no work
            // await _context.GameEntities.ExecuteUpdateAsync(e =>
            // e.SetProperty(b => b.initiative, b => b.initiative + 100));

            // return await _context.GameEntities.AsNoTracking().ToListAsync();

            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("update");

            return await _context.GameEntities.ToArrayAsync();
        }

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
                await _hubContext.Clients.All.SendAsync("update");

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

        [HttpPut("{id}/player-initiative")]
        public async Task<IActionResult> PlayerInitiativeUpdate(long id, int newInitiative)
        {
            GameEntity selectedEntity;
            if ((selectedEntity = _context.GameEntities.Find(id)!) == null)
            {
                return BadRequest();
            }

            selectedEntity.temp_initiative = newInitiative;

            _context.Entry(selectedEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("player_ready");

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

            var num_ready = await _context.GameEntities.CountAsync(o => o.temp_initiative != -1);
            var num_players = await _context.GameEntities.CountAsync(o => o.isPlayer == true);

            if (num_ready >= num_players)
            {
                await _context.GameEntities.Where(o => o.isPlayer == true)
                    .ForEachAsync(player =>
                    {
                        player.initiative = player.temp_initiative;
                        player.temp_initiative = -1;
                    }
                    );

                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.SendAsync("update");
                await _hubContext.Clients.All.SendAsync("player_ready");
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
              return Problem("Entity set 'GameEntityContext.GameEntities' is null.");
          }
            _context.GameEntities.Add(gameEntity);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("update");

            return CreatedAtAction("GetGameEntity", new { id = gameEntity.id }, gameEntity);
        }

        [HttpPost("CreateEntity")]
        public async Task<ActionResult<GameEntity>> backendCreateEntity(string entityName, bool isPlayer)
        {
            
            if (entityName == null)
            {
                return Problem("No playername provided.");
            }

            GameEntity newEntity = new GameEntity();

            // If there are no entities, set id to 0. Otherwise use max + 1
            // I think this is bugged haha
            long numEntity = _context.GameEntities.Count() != 0 ?
                _context.GameEntities.Max(e => e.id)+1 : 0;

            newEntity.id = numEntity;
            newEntity.entityName = entityName;
            newEntity.initiative = -1;
            newEntity.temp_initiative = -1;
            newEntity.isPlayer = isPlayer;

            _context.GameEntities.Add(newEntity);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("update");

            return CreatedAtAction("GetGameEntity", new { id = newEntity.id }, newEntity);
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
            await _hubContext.Clients.All.SendAsync("update");
            await _hubContext.Clients.All.SendAsync("player_ready");


            return NoContent();
        }

        #endregion

        private bool GameEntityExists(long id)
        {
            return (_context.GameEntities?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
