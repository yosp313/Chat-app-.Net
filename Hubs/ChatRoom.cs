using Chat_App.Models;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App.Hubs;

public class ChatRoom : Hub
{
    public async Task JoinGroup(string roomId, string userName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
        await Clients.Group(roomId).SendAsync("RecieveMessage", "admin", $"{userName} has joined");
    }

    public async Task SendMessage(string roomId, string userName, string message)
    {
        await Clients.Group(roomId).SendAsync("ReceiveMessage", userName, message);
    }
}
