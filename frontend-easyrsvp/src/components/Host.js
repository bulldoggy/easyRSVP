import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Host() {
    const paperStyle = {padding:"50px 20px", width: 600, margin:"20px auto"};
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [students, setStudents] = useState([]);

    const handleClick = (e)=>{
        e.preventDefault();
        const student = {name, address};
        fetch("http://localhost:8080/student/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=> {
            console.log("New student added")
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res => res.json())
        .then(result => {
            setStudents(result)
        })
    }, [handleClick])

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{color:"blue"}}> <u>Add Student</u> </h1>

                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField id="standard-basic" label="Student Name" variant="standard" fullWidth 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <TextField id="standard-basic" label="Student Address" variant="standard" fullWidth 
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />

                <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>
                </Box>
            </Paper>

            <Paper elevation={3} style={paperStyle}>
                {students.map(student=>(
                    <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                        Id:{student.id}<br/>
                        Name:{student.name}<br/>
                        Address:{student.address}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
