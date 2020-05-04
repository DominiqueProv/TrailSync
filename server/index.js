const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const {
  handleTrailsData,
  handleImagesData,
  handleLogin,
  handleCallBack,
  handleCreatePlaylist,
  handleUserInfo,
  handleRefreshToken,
} = require("./hanlders");

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .get("/trails", handleTrailsData)
  .get("/getUserInfo", handleUserInfo)
  .get("/images", handleImagesData)
  .get("/login", handleLogin)
  .get("/callback", handleCallBack)
  .get("/refresh_token/:token", handleRefreshToken)
  .get("/recommendations", handleCreatePlaylist);

console.log("Listening on 8888");
app.listen(8888);
