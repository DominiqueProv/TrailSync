import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

const Create = () => {

  let parsed = queryString.parse(window.location.hash);
  let access_token = parsed.access_token
  let refresh_token = parsed.refresh_token

  const [data, setData] = useState(null);
  console.log(access_token);
  console.log(refresh_token);
  

  useEffect(() => {
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        "content-type": 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
        })
  }, [])

  async function createPlaylist(userId, access_token){
    console.log(access_token);
    
    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method : "POST",
      headers : {
        // "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer" + 'BQBlnmzs24obLBmVa4iXm2UmbzzG3BukPLo3RcMRgy9QRX2o9_B7X3MzSUhOzFy2LP5in31Y-8COMKtU2pEl7IeK7EsBnJNaCyolyb_l_5RGasHY1yNgHmyA7560AVuLdazoUAB05H2xOSuWHArx8-qwjZJfiZ8wTPkSqz5i6jIRt_K6q4m1OpLpZ75m3_CJxw',
      },
      "body": {
        "name": "Another PLaylist",
        "description": "Dynamic",
        // "public": false
      }
    })
      .then(response => {
        if(response.status === 400){
          fetch(`/refresh_token/${refresh_token}`)
          .then(res => res.json())
          .then(res => console.log('Hellooooo', res.access_token))
        }
        // console.log(response);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return(
    <>
    {data && 
    <button
    onClick={() => createPlaylist(data.id, access_token)}
  >
    CreatePlaylist</button>
    }
    </>
  );
}

export default Create;