import React from 'react';
import { AppBar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar sx={{ background: '#233b46', height: '55px', display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', boxSizing: 'border-box' }}>
          <Typography variant="h6" component="div">
            easyRSVP
          </Typography>
    </AppBar>
  );
}
