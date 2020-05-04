const fetch = require("isomorphic-fetch");
require("dotenv").config();
const trails = require("../server/data/parc-sepaq.json");
const querystring = require("querystring");
const request = require("request");
const rp = require("request-promise");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "http://localhost:8888/callback";
const pixabay_key = process.env.PIXABAY_KEY;
const stateKey = "spotify_auth_state";
let userInfo;
let userId;
let access_token;
let playlist_id;
let arrId = [];

if (userInfo && userInfo.id) {
  console.log(userId);
}

const generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const handleTrailsData = (req, res) => {
  return res.json(trails);
};
const handleImagesData = (req, res) => {
  fetch(`https://pixabay.com/api/?key=${pixabay_key}&q="forest"`)
    .then((res) => {
      return res.json();
    })
    .then((payload) => res.send(payload));
};
const handleLogin = (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email playlist-modify-private user-read-playback-state ";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};
const handleCallBack = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "http://localhost:3000/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        (access_token = body.access_token),
          (refresh_token = body.refresh_token);
        console.log("<<<<", access_token);
        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
          userInfo = body;
          userId = body.id;
          // console.log(userId);
          // we can also pass the token to the browser to make requests from there
          //res.send instead of redirect
          res.redirect(
            "http://localhost:3000/init"

            //         +
            //           querystring.stringify({
            //             access_token: access_token,
            //             refresh_token: refresh_token,
            // })
          );
          // return userId;
        });
      } else {
        res.redirect(
          "http://localhost:3000/" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
};
// const handleCreatePlaylist = (req, res) => {

//   var createPlaylist = {
//     method: "POST",
//     url: "https://api.spotify.com/v1/users/12121769867/playlists",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + access_token,
//     },
//     body: {
//       name: "New Playlist",
//       description: "New playlist description",
//       public: false,
//     },
//     json: true,
//   };

//   request(createPlaylist, function (error, response, body) {
//     // playlist_id = body.id;
//     res.send(body);
//     console.log("<<<<<<<", body.id);
//     playlist_id = body.id;
//     return playlist_id;
//   });

// };
// const handleAddSongs = (req, res) => {
//   const addsongs = {
//     method: "POST",
//     url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
//     qs: {
//       uris: `${arrId}`,
//     },
//     headers: {
//       authorization: "Bearer " + access_token,
//       accept: "application/json",
//     },
//   };

//   request(addsongs, function (error, response, body) {
//     res.send(body);
//   });
// };

const handleUserInfo = (req, res) => {
  return res.json(userInfo);
};
const handleRefreshToken = (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.params.token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      console.log(body.access_token);

      res.send({
        access_token: access_token,
      });
    }
  });
};

const handleCreatePlaylist = (req, res) => {
  var recommendations = {
    url: "https://api.spotify.com/v1/recommendations",
    method: "GET",
    qs: {
      limit: "2",
      seed_genres: "rock",
      min_acousticness: ".2",
      max_acousticness: ".4",
      min_danceability: ".5",
      max_danceability: "1",
      min_energy: "0.4",
      target_energy: ".6",
      min_popularity: "50",
      min_tempo: ".7",
      target_tempo: ".7",
    },
    headers: {
      authorization: "Bearer " + access_token,
      accept: "application/json",
    },
    json: true,
  };

  rp(recommendations)
    .then((body) => {
      body.tracks.map((song) => {
        arrId.push(song.uri);
      });
      console.log(arrId);
      // return arrId;
    })
    .then(() => {
      console.log(userId);
      var createPlaylist = {
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: {
          name: "New Playlist",
          description: "New playlist description",
          public: false,
        },
        json: true,
      };
      rp(createPlaylist)
        .then((body) => {
          playlist_id = body.id;
          console.log(body);
          return playlist_id;
        })
        .then(() => {
          const addsongs = {
            method: "POST",
            url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
            qs: {
              uris: `${arrId}`,
            },
            headers: {
              authorization: "Bearer " + access_token,
              accept: "application/json",
            },
          };

          rp(addsongs).then((body) => {
            res.send(body);
            console.log(body);
          });
        });
    });
};

module.exports = {
  handleTrailsData,
  handleImagesData,
  handleLogin,
  handleCallBack,
  handleCreatePlaylist,
  handleUserInfo,
  handleRefreshToken,
};
