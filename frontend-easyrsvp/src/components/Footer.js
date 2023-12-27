import React from 'react';
import { Box } from '@mui/material';
import like from '.././like.png'
import { useState, useEffect } from 'react';

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);

  const fetchClickCount = () => {
    fetch("https://easyrsvp-web.onrender.com/rsvp/getCount?counterId=1")
      .then((response) => {
        return response.json();
      })
      .then(result => {
        setClickCount(result.counterCount);
      });
  }

  const addClickCount = () => {
    fetch("https://easyrsvp-web.onrender.com/rsvp/addCount?counterId=1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then(setClickCount(clickCount + 1));
  }


  useEffect(() => {
    fetchClickCount();
  }, [])

  return (
    <>
      <Box sx={{ height: '65px', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', justifySelf: 'flex-end', flexDirection: 'column', marginTop: '10px' }}>
        <p style={{ color: "#b8c1ec", fontSize: '15px', margin: '0' }}>
          Any bugs or issues? Send an email to easyrsvponline@hotmail.com and it will be looked into, much appreciated!
        </p>

        <div style={{ width: "parent", display: "flex", flexDirection: "row", alignItems: 'center' }}>
          <img style={{ cursor: "pointer" }} src={like} alt='like' width={'45px'} height={'45px'} onClick={() => addClickCount()} />
          <p style={{ color: "#eebbc3", fontSize: '15px', margin: '0' }}>
            has been clicked {clickCount} times!
          </p>
        </div>
      </Box>

      <br />
    </>
  );
}
