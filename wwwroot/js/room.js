"use strict";

let connection = new signalR.HubConnectionBuilder().withUrl("/Room").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;
document.getElementById("joinButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
  let li = document.createElement("li");
  document.getElementById("messagesList").appendChild(li);
  // We can assign user-supplied strings to an element's textContent because it
  // is not interpreted as markup. If you're assigning in any other way, you
  // should be aware of possible script injection concerns.
  li.textContent = `${user} :  ${message}`;
});

connection
  .start()
  .then(function () {
    document.getElementById("sendButton").disabled = false;
  })
  .catch(function (err) {
    return console.error(err.toString());
  });

document
  .getElementById("sendButton")
  .addEventListener("click", function (event) {
    let user = document.getElementById("userInput").value;
    let message = document.getElementById("messageInput").value;
    let roomId = document.getElementById("roomInput").value;
    connection
      .invoke("SendMessage", { user, roomId }, message)
      .catch(function (err) {
        return console.error(err.toString());
      });
    event.preventDefault();
  });

document
  .getElementById("joinButton")
  .addEventListener("click", function (event) {
    let user = document.getElementById("userInput").value;
    let roomId = document.getElementById("roomInput").value;
    connection
      .invoke("JoinGroup", { user, roomId })
      .then(() => console.log(`${user} has joined`))
      .catch(function (err) {
        return console.error(err.toString());
      });
    event.preventDefault();
  });
