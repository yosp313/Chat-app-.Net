using Chat_App.Models;
using Microsoft.AspNetCore.SignalR;

namespace Chat_App.Hubs;

public class ChatRoom : Hub
{
    public async Task JoinGroup(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.roomId);
        await Clients
            .Group(conn.roomId)
            .SendAsync("JoinGroup", "admin", $"{conn.userName} has joined");
    }

    public async Task SendMessage(UserConnection conn, string message)
    {
        await Clients.Group(conn.roomId).SendAsync("SendMessage", conn.userName, message);
    }
}
