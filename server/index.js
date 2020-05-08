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

app
  .use(express.static(__dirname + "/public"))
  .use(express.json())
  .use(cors())
  .use(cookieParser())
  .get("/trails", handleTrailsData)
  .get("/getUserInfo", handleUserInfo)
  .get("/login", handleLogin)
  .get("/callback", handleCallBack)
  .get("/refresh_token", handleRefreshToken)
  .get("/getcurrentlyplaying", handleGetPlaying)
  .post("/createplaylist", handleCreatePlaylist)
  .post("/trailgeo", handleTrailGeo)
  .post("/trailinfo", handleTrailInfo)
  .post("/getHistorique", handleGetHistorique);
console.log("Listening on 8888");
app.listen(8888);
