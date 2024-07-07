import { Express } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import chat from "./chat";

const useSocket = (app: Express) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: [/http:\/\/localhost:*/, /http:\/\/127.0.0.1:*/],
    },
  });
  chat(io);
  //   io.on("connection", (client) => {
  //     console.log("client connected");
  //     io.emit("count", io.engine.clientsCount);
  //     client.on("disconnect", () => {
  //       console.log("client disconnect");
  //       io.emit("count", io.engine.clientsCount);
  //     });

  //     client.on("chat", (data) => {
  //       console.log(data);
  //       data.count = io.engine.clientsCount;
  //       io.emit("chat", data);
  //     });
  //   });

  //   server.listen(app.get("port"), () => {
  //     console.log("server opens ", app.get("port"));
  //   });

  return { io, server };
};

export default useSocket;
