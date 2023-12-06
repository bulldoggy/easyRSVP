import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Snackbar, Alert, Radio, RadioGroup, FormControlLabel, FormControl, Modal, Typography, FormLabel } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import dayjs from "dayjs";

export default function Home() {
    const paperStyle = {padding:"10px 20px", width: 800, margin:"20px auto"};
    const linkDivStyle = { width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "-15px"};
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    const [guestName, setGuestName] = useState('');
    const [guestMobile, setGuestMobile] = useState('');
    const [guestDecision, setGuestDecision] = useState('');
    const [guestNotes, setGuestNotes] = useState('');

    const [savedGuestName, setSavedGuestName] = useState('');
    const [savedGuestMobile, setSavedGuestMobile] = useState('');
    const [savedGuestDecision, setSavedGuestDecision] = useState('');
    const [savedGuestNotes, setSavedGuestNotes] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [mobileTouched, setMobileTouched] = useState(false);
    const [decisionTouched, setDecisionTouched] = useState(false);

    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [editSuccessSnackbar, setEditSuccessSnackbar] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    
    const [response, setResponse] = useState(null);
    const [invite, setInvite] = useState(null);

    const [guestCode, setGuestCode] = useState('');
    const [editing, setEditing] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const submitEditForm = (e) => {
        if(guestName === '' || guestMobile === '' || guestDecision === '') {
            setNameTouched(true);
            setMobileTouched(true);
            setDecisionTouched(true);
            setErrorSnackbar(true);
        } else {
            e.preventDefault();
            const responseEditDTO = {guestCode, guestName, guestMobile, guestDecision, guestNotes};
            
            fetch("http://localhost:8080/rsvp/editResponse", {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(responseEditDTO)
            })
            .then(res => res.json())
            .then(result => {
                setResponse(result);
                setEditSuccessSnackbar(true);
                setEditing(false);
            })
        }
    }

    const cancelClicked = (e) => {
        setGuestName(savedGuestName);
        setGuestMobile(savedGuestMobile);
        setGuestDecision(savedGuestDecision);
        setGuestNotes(savedGuestNotes);
        setEditing(false);
    }

    const submitDeleteForm = (e) => {
        setGuestName(savedGuestName);
        setGuestMobile(savedGuestMobile);
        setGuestDecision(savedGuestDecision);
        setGuestNotes(savedGuestNotes);
        setEditing(false);
    }

    useEffect(()=>{
        fetch("http://localhost:8080" + window.location.pathname + window.location.search)
        .then(res => res.json())
        .then(result => {
            setResponse(result.response);
            setInvite(result.invite);
            console.log(result);
        })
    }, [])

    useEffect(()=>{
        if(response != null) {
            setGuestName(response.guestName);
            setGuestMobile(response.guestMobile);
            setGuestDecision(response.guestDecision);
            setGuestNotes(response.guestNotes);
            setGuestCode(response.guestCode);
            setSavedGuestName(response.guestName);
            setSavedGuestMobile(response.guestMobile);
            setSavedGuestDecision(response.guestDecision);
            setSavedGuestNotes(response.guestNotes);
        }
    }, [response])

    return (
        <Container style={{paddingTop:"60px"}}>
            <Paper elevation={3} style={paperStyle}>
                <h2> You have been invited! </h2>

                {invite != null && 
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <h4 style={{float: "left", marginBottom: "-5px"}}>Host:</h4>
                    <TextField id="outlined-basic" variant="outlined" fullWidth disabled 
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={invite.ownerName}
                    />

                    <h4 style={{float: "left", marginBottom: "-5px"}}>Details:</h4>
                    <TextField id="outlined-basic" variant="outlined" multiline fullWidth disabled 
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={invite.eventDetails}
                    />

                    <h4 style={{float: "left", marginBottom: "-5px"}}>Address:</h4>
                    <TextField id="outlined-basic" variant="outlined" fullWidth disabled 
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={invite.eventAddress}
                    />


                    <div style={{width: "parent", display: "flex", marginBottom: "-25px", marginTop: "-12px"}}> 
                        <h4>Date:</h4>
                    </div>

                    <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DateTimePicker fullWidth disableOpenPicker
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            value={dayjs(invite.eventDate)}  
                            InputProps={{
                                disabled: true,
                                readOnly: true
                            }}
                            ampm={true}
                            />
                        </LocalizationProvider>
                        <TextField id="outlined-basic" variant="outlined" fullWidth disabled style={{width: "70%", marginRight: "-15px"}}
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            value={invite.timezone}
                        />
                    </div>
                </Box>
                }
            </Paper>

            {editing == false && response != null &&
            <Paper elevation={3} style={paperStyle}>
                <h2> Your personal RSVP </h2>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <h4 style={{float: "left", marginBottom: "-5px"}}>Guest:</h4>
                    <TextField id="outlined-basic" variant="outlined" fullWidth disabled 
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={guestName}
                    />

                    <h4 style={{float: "left", marginBottom: "-5px"}}>Mobile:</h4>
                    <TextField id="outlined-basic" variant="outlined" fullWidth disabled 
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={guestMobile}
                    />

                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">{<h4 style={{color: "black", marginBottom: "-5px", marginTop: "-1px"}}>Attendance</h4>}</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={guestDecision}
                        >
                            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                            <FormControlLabel value="NO" control={<Radio />} label="No" />
                            <FormControlLabel value="UNSURE" control={<Radio />} label="Unsure" />
                        </RadioGroup>
                    </FormControl>

                    <br/>
                    <h4 style={{float: "left", marginBottom: "-3px", marginTop: "-8px"}}> Additional Notes:</h4>
                    <TextField id="outlined-multiline-static" multiline fullWidth disabled
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#000000",
                            },
                        }}
                        value={guestNotes}
                    />
                </Box>
                
                <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "15px"}}>
                    <Button variant="contained" onClick={() => setEditing(true)} color="info" style={{marginRight: "-140px"}}>Edit</Button>
                    <Button variant="contained"  onClick={() => setModalOpen(true)}color="error" style={{marginLeft: "-140px"}}>Delete</Button>
                </div>
            </Paper>
            }

            {editing == true && response != null &&
            <Paper elevation={3} style={paperStyle}>
                <h2> Edit RSVP </h2>

                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Guest Name" fullWidth required 
                        value={guestName}
                        onChange={(e)=> {
                            setGuestName(e.target.value) 
                            setNameTouched(true);
                        }}
                        error={nameTouched && guestName.length === 0}
                    />
                    <TextField id="outlined-basic" label="Mobile Number" fullWidth required 
                        value={guestMobile}
                        onChange={(e)=> {
                            setGuestMobile(e.target.value) 
                            setMobileTouched(true);
                        }}
                        error={mobileTouched && guestMobile.length === 0}
                    />

                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">Attendance *</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e)=> {
                                setGuestDecision(e.target.value) 
                                setDecisionTouched(true);
                            }}
                            value={guestDecision}
                        >
                            <FormControlLabel value="YES" control={<Radio />} label="Yes" />
                            <FormControlLabel value="NO" control={<Radio />} label="No" />
                            <FormControlLabel value="UNSURE" control={<Radio />} label="Unsure" />
                        </RadioGroup>
                    </FormControl>

                    <TextField id="outlined-multiline-static" label="Additional Notes" multiline fullWidth
                        value={guestNotes}
                        onChange={(e)=> {
                            setGuestNotes(e.target.value) 
                        }}
                    />
                    
                    <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "15px"}}>
                        <Button variant="contained" onClick={cancelClicked} color="warning" style={{marginRight: "-140px"}}>Cancel</Button>
                        <Button variant="contained" onClick={submitEditForm} color="success" style={{marginLeft: "-140px"}}>Submit</Button>
                    </div>
                </Box>
            </Paper>
            }

            <Snackbar
                open={editSuccessSnackbar}
                onClose={() => setEditSuccessSnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="success">RSVP edited successfully</Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbar}
                onClose={() => setErrorSnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="error">Fill in all required fields</Alert>
            </Snackbar>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm deletion of your RSVP?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This process is irreversible
                    </Typography>
                    <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "30px"}}>
                        <Button variant="contained" onClick={() => setModalOpen(false)} color="warning" style={{marginRight: "-40px"}}>Cancel</Button>
                        <Button variant="contained" onClick={submitDeleteForm} color="success" style={{marginLeft: "-40px"}}>Confirm</Button>
                    </div>
                </Box>
            </Modal>
        </Container>
    );
}
