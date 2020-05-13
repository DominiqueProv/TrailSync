const fetch = require("isomorphic-fetch");
require("dotenv").config();
const querystring = require("querystring");
const request = require("request");
const rp = require("request-promise");
const { MongoClient } = require("mongodb");
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = "https://trailsync.herokuapp.com/callback";
const redirect_uri = "https://trailsync.herokuapp.com/callback";
const URI = process.env.URI;
// const pixabay_key = process.env.PIXABAY_KEY;
const stateKey = "spotify_auth_state";
// let userInfo;
// let userId;
let userHistorique;
// let access_token;
// let refresh_token;
let playlist_id;
let arrId = [];
let name;

async function handleGetHistorique(req, res) {
  userHistorique = req.body.userId;
  console.log("<<<<<", userHistorique);
  // JSON.parse(userHistorique);
  // console.log("<<<<<", userHistorique);

  const URI = process.env.URI;
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const result = await client
      .db("trailSync")
      .collection("userplaylist")
      .find({ "playlistInfo.owner.id": userHistorique })
      .toArray();
    result
      ? res.status(200).send({ status: 200, result })
      : res.send("Notting has been created yet");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function handleTrailGeo(req, res) {
  const trailId = req.body;
  const URI = process.env.URI;
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const result = await client
      .db("trailSync")
      .collection("trail-geolocation")
      .findOne({ _id: parseInt(trailId.id) });
    if (result) {
      let trailGeo = result;
      res.status(200).send({ status: 200, trailGeo });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function handleTrailInfo(req, res) {
  const trailId = req.body;
  const URI = process.env.URI;
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const result = await client
      .db("trailSync")
      .collection("trails-startingpoint")
      .findOne({ _id: parseInt(trailId.id) });
    if (result) {
      let trailGeo = result;
      res.status(200).send({ status: 200, trailGeo });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function saveUserPlaylistInfo(playlistInfo) {
  const URI = process.env.URI;
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const result = await client
      .db("trailSync")
      .collection("userplaylist")
      .insertOne({ playlistInfo });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
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
const handleTrailsData = async (req, res) => {
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const result = await client
      .db("trailSync")
      .collection("trails-startingpoint")
      .find()
      .toArray();
    if (result) {
      let trails = result;

      res.status(200).send({ status: 200, trails });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

// const handleImagesData = (req, res) => {
//   fetch(`https://pixabay.com/api/?key=${pixabay_key}&q="forest"`)
// .then((res) => {
//   return res.json();
// })
// .then((payload) => res.send(payload));
// };

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

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "https://trailsync-a8b55.web.app/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
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
        // console.log("body login", body.access_token);
        access_token = body.access_token;
        // console.log(access_token);
        refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        //res.send instead of redirect
        res.redirect(
          "https://trailsync-a8b55.web.app/init#" +
            // "http://localhost:3000/init#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "https://trailsync-a8b55.web.app/" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
};

const handleUserInfo = (req, res) => {
  let token = req.body.access_token;
  // console.log("<><><><><>", token);

  let options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + token },
    json: true,
  };

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    let userInfo = body;
    // userId = body.id;
    // console.log(userInfo);
    res.send(userInfo);
  });
  // return res.send(userInfo);
};
const handleRefreshToken = () => {
  // requesting access token from refresh token
  let authOptions = {
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
      // console.log("log 4", body);

      access_token = body.access_token;
      // return {acces_token, body.referesh_token}
      // res.send({
      //   access_token: access_token,
      // });
    }
  });
};

const handleCreatePlaylist = (req, res) => {
  let token = req.body.token;
  let userId = req.body.userId;
  console.log(userId);

  name = req.body.name;
  const {
    seed_genres,
    limit,
    target_acousticness,
    target_danceability,
    target_energy,
    target_tempo,
  } = req.body.qs;

  let recommendations = {
    url: "https://api.spotify.com/v1/recommendations",
    method: "GET",
    qs: {
      seed_genres: `${seed_genres}`,
      limit: `${limit}`,
      target_acousticness: `${target_acousticness}`,
      target_danceability: `${target_danceability}`,
      target_energy: `${target_energy}`,
      target_tempo: `${target_tempo}`,
    },
    headers: {
      authorization: "Bearer " + token,
      accept: "application/json",
    },
    json: true,
  };
  rp(recommendations)
    .then((body) => {
      arrId = [];
      body.tracks.map((song) => {
        arrId.push(song.uri);
      });
      console.log(arrId);
    })
    .then(() => {
      let createPlaylist = {
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: {
          name: name,
          description: "Playlist make with love by Dominique Provencher",
          public: false,
        },
        json: true,
      };
      rp(createPlaylist)
        .then((body) => {
          playlist_id = body.id;
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
          rp(addsongs).then(() => {
            const getplaylistInfo = {
              url: `https://api.spotify.com/v1/playlists/${playlist_id}`,
              headers: {
                authorization: "Bearer " + access_token,
                accept: "application/json",
              },
              json: true,
            };
            rp(getplaylistInfo).then((playlistInfo) => {
              saveUserPlaylistInfo(playlistInfo);
              res.send(playlistInfo);
            });
          });
        });
    })
    .catch((err) => {
      let errorMessage = err.error.error.message;
      if (errorMessage === "Invalid access token") {
        handleRefreshToken();
        console.log("log 5", access_token);
      }
    });
};

const handleGetPlaying = (req, res) => {
  let access_token = req.body.access_token;
  console.log(access_token);

  // console.log(access_token);
  const getCurrentPlaying = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    method: "GET",
    headers: {
      authorization: "Bearer " + access_token,
      accept: "application/json",
    },
  };
  rp(getCurrentPlaying).then((result) => {
    console.log(typeof result, result);
    // let parsedresult = JSON.parse(result);
    // console.log(typeof parsedresult, parsedresult);
    if (result.length) {
      res.send(result);
    } else {
      res.json("Notting is playing at the moment");
    }
  });
};

module.exports = {
  handleTrailsData,
  handleLogin,
  handleCallBack,
  handleCreatePlaylist,
  handleUserInfo,
  handleRefreshToken,
  handleTrailGeo,
  handleTrailInfo,
  handleGetHistorique,
  handleGetPlaying,
};
