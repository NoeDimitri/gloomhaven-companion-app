namespace AspAngularTemplate.Hubs
{
    using Microsoft.AspNetCore.SignalR;

    public class updateHub : Hub
    {
        private readonly updateHelperInterface _updateHelper;
        public updateHub(updateHelperInterface updateHelper)
        {
            _updateHelper = updateHelper;
        }

        public async Task updateStatus()
        {
            await Clients.All.SendAsync("update");
        }
    }
}