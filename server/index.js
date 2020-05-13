const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const {
  handleTrailsData,
  handleTrailInfo,
  handleLogin,
  handleCallBack,
  handleCreatePlaylist,
  handleUserInfo,
  handleRefreshToken,
  handleTrailGeo,
  handleGetHistorique,
  handleGetPlaying,
} = require("./hanlders");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8888;
}

app
  .use(express.static(__dirname + "build"))
  // .use(express.static(__dirname + "/public"))
  .use(express.json())
  .use(cors())
  .use(cookieParser())
  .get("/trails", handleTrailsData)
  .post("/getUserInfo", handleUserInfo)
  .get("/login", handleLogin)
  .get("/callback", handleCallBack)
  .get("/refresh_token", handleRefreshToken)
  .post("/getcurrentlyplaying", handleGetPlaying)
  .post("/createplaylist", handleCreatePlaylist)
  .post("/trailgeo", handleTrailGeo)
  .post("/trailinfo", handleTrailInfo)
  .post("/getHistorique", handleGetHistorique);
console.log("Listening on 8888");
app.listen(port);
