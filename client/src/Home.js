import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';

function Home() {

  return (
    <>
          <a href="http://localhost:8888/login">
            <button>Login With Spotify</button>
          </a >
    </>
  );
}


export default Home;