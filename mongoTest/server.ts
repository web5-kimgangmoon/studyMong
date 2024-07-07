import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";
import multer from "multer";
import useSocket from "./socket/useSocket";

import router from "./controllers/index";

dotenv.config();

const app = express();
const { server, io } = useSocket(app);

app.set("port", process.env.PORT || 3080);
app.use((req, res, next) => {
  if (process.env.NODE_ENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(
  cors({
    origin: [/http:\/\/localhost:*/, /https:\/\/127.0.0.1:*/],
    // credentials: true, // 쿠키가 있다면
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser(process.env.COOKIESECRET || "dksajdalsjd")); // 쿠키가 필요하다면

const upload = (imgs: string) =>
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "./uploads");
      },
      filename: (req, file, callback) => {
        callback(null, `${Date.now}_${file.originalname}`);
      },
    }),
  }).array(imgs);

// app.post("/upload", upload("imgs"), (req,res) =>{
//   res.send("ok");
// } )

app.use("/api", router);

server.listen(app.get("port"), () => {
  console.log("server opens ", app.get("port"));
});
