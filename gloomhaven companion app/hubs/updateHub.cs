namespace AspAngularTemplate.Hubs
{
    using Microsoft.AspNetCore.SignalR;

    public class updateHub : Hub
    {


        public async Task updateStatus()
        {
            await Clients.All.SendAsync("update");
        }
    }
}