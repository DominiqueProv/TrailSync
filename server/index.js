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
  .get("/refresh_token/:token", handleRefreshToken)
  .post("/createplaylist", handleCreatePlaylist)
  .post("/trailgeo", handleTrailGeo)
  .post("/trailinfo", handleTrailInfo);
console.log("Listening on 8888");
app.listen(8888);
