import { Server } from "socket.io";

const chat = (io: Server) => {
  const chat = io.of("chat");
  chat.on("connection", (client) => {
    console.log("connected chat");
    // client.join("-1");
    chat.adapter.on("create-room", (room) => {
      console.log(`room ${room} was created`);
    });
    chat.adapter.on("join-room", (room, id) => {
      console.log(`socket ${id} has joined room ${room}`);
    });
    chat.adapter.on("delete-room", (room, id) => {
      console.log(`socket ${id} has deleted romm ${room}`);
    });

    client.on("disconnect", () => {
      console.log("client disconnect");
    });
    console.log(client.rooms);
    client.on("chat", (data) => {
      let now = [...client.rooms][0];
      console.log(now);
      if (data.room != now) {
        client.join(data.room);
        now = data.room;
      }
      console.log(data);
      // chat.to(now).emit("chat", data);
      client.emit("chat", { name: "나", chat: data.chat });
      client.broadcast
        .to(now)
        .emit("chat", { name: data.name, chat: data.chat });
      client.emit("client", client.id);
      // chat.to(1).emit("chat", data);
      // chat.to(2).emit("chat", data);
      // client.leave(1);
      // client.rooms.clear();
      // console.log(client.rooms);
      // io.to(); // 개인 룸에 보낼 수 있음, 개인 룸은 개인 ID를 기반으로 함
      console.log(client.id);

      if (data.id) {
        client.join(data.id);
      }
      chat.to(data.id).emit("chat", { name: "자신에게", chat: "자기가" });
    });

    // client.on("chat", (data) => {
    //   // console.log(client.adapter); adapter는 private이므로 접근 불가능
    //   console.log(client.rooms);
    //   chat.to("1").emit("chat", data);
    //   // client.adapter.rooms.clear(); 상기의 이유로 마찬가지로 불가능
    //   client.rooms.clear();
    // });
  });
};

export default chat;
