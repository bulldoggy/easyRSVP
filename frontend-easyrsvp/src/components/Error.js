import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Error({ message }) {
    const paperStyle = {padding:"50px 20px", width: 600, margin:"20px auto"};
    
    return (
        <Paper elevation={3} style={paperStyle}>
            <h3> {message} </h3>        
        </Paper>
    );
}
