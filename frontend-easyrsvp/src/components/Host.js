import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Snackbar, Alert, Radio, RadioGroup, FormControlLabel, FormControl, Modal, Typography, FormLabel } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import Error from './Error';

export default function Host() {
    const paperStyle = {padding:"10px 20px", width: 800, margin:"20px auto"};
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        //boxShadow: 24,
        p: 4,
        borderRadius: '6px',
      };
    
    const [inviteCode, setInviteCode] = useState('');

    const [ownerName, setOwnerName] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventDate, setEventDate] = useState(null);
    const [eventTimezone, setEventTimezone] = useState('');

    const [savedOwnerName, setSavedOwnerName] = useState('');
    const [savedEventDetails, setSavedEventDetails] = useState('');
    const [savedEventAddress, setSavedEventAddress] = useState('');
    const [savedEventDate, setSavedEventDate] = useState(null);
    const [savedEventTimezone, setSavedEventTimezone] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [detailsTouched, setDetailsTouched] = useState(false);
    const [addressTouched, setAddressTouched] = useState(false);

    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [editSuccessSnackbar, setEditSuccessSnackbar] = useState(false)
    
    const [invite, setInvite] = useState(null);

    const [editing, setEditing] = useState(false);
    const [codeError, setCodeError] = useState(null);
    const [inviteDeleted, setInviteDeleted] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    let timezone = "Local Time";

    const submitEditForm = (e) => {
        if(ownerName === '' || eventDetails === '' || eventAddress === '' || isNaN(Date.parse(eventDate))) {
            setNameTouched(true);
            setDetailsTouched(true);
            setAddressTouched(true);
            setErrorSnackbar(true);
        } else {
            if(eventTimezone !== '') {
                timezone = eventTimezone;
            } else {
                setEventTimezone(timezone);
            }

            e.preventDefault();
            const inviteEditDTO = {inviteCode, ownerName, eventDetails, eventAddress, eventDate, timezone};
            //logging to view inviteCreateDTO
            console.log(inviteEditDTO);
            fetch("http://localhost:8080/rsvp/editInvite", {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(inviteEditDTO)
            })
            .then(res => res.json())
            .then(result => {
                setInvite(result);
                setEditSuccessSnackbar(true);
                setEditing(false);
            })
        }
    }

    const cancelClicked = (e) => {
        setOwnerName(savedOwnerName);
        setEventDetails(savedEventDetails);
        setEventAddress(savedEventAddress);
        setEventDate(savedEventDate);
        setEventTimezone(savedEventTimezone);
        setEditing(false);
    }

    const submitDeleteForm = (e) => {
        e.preventDefault();
            
        fetch("http://localhost:8080/rsvp/deleteInvite?code=" + invite.inviteCode, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
        })
        .then((response) => {
            setInviteDeleted(true);
            setModalOpen(false);
        })
    }

    useEffect(()=>{
        fetch("http://localhost:8080" + window.location.pathname + window.location.search)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(result => {
            setInvite(result);
            setCodeError(false);
            console.log(result);
        })
        .catch((error) => {
            setCodeError(true);
        });
    }, [])

    useEffect(() => {
        if(invite != null) {
            setOwnerName(invite.ownerName);
            setEventDetails(invite.eventDetails);
            setEventAddress(invite.eventAddress);
            setEventDate(invite.eventDate);
            setEventTimezone(invite.timezone);
            setSavedOwnerName(invite.ownerName);
            setSavedEventDetails(invite.eventDetails);
            setSavedEventAddress(invite.eventAddress);
            setSavedEventDate(invite.eventDate);
            setSavedEventTimezone(invite.timezone);
            setInviteCode(invite.inviteCode);
        }
    }, [invite])

    return (
        <Container style={{paddingTop:"60px"}}>
            {inviteDeleted == true && //code is invalid
                <Error 
                    message={"Your invite has been deleted"}
                />
            } 

            {codeError == true && inviteDeleted == false && //code is invalid
                <Error 
                    message={"Invalid link provided, check if your host link is correct"}
                />
            } 

            {codeError == false && inviteDeleted == false && editing == false && invite != null &&//if invite fetched from server and not editing
                <Paper elevation={3} style={paperStyle}>
                    <h2> Your Invite </h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <h4 style={{float: "left", marginBottom: "-5px"}}>Host:</h4>
                        <TextField variant="standard" fullWidth disabled 
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                            value={invite.ownerName}
                        />

                        <h4 style={{float: "left", marginBottom: "-5px"}}>Details:</h4>
                        <TextField variant="standard" multiline fullWidth disabled 
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                            value={invite.eventDetails}
                        />

                        <h4 style={{float: "left", marginBottom: "-5px"}}>Address:</h4>
                        <TextField variant="standard" fullWidth disabled 
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                            value={invite.eventAddress}
                        />


                        <div style={{width: "parent", display: "flex", marginBottom: "-25px", marginTop: "-12px"}}> 
                            <h4>Date:</h4>
                        </div>

                        <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker fullWidth disableOpenPicker readOnly
                                format='DD/MM/YYYY hh:mm A'
                                sx={{
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    marginTop: "-13px",
                                    marginLeft: "-15px"
                                }}
                                value={dayjs(invite.eventDate)}  
                                ampm={true}
                                />
                            </LocalizationProvider>

                            <TextField variant="standard" fullWidth disabled style={{width: "85%"}}
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    },
                                }}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                value={invite.timezone}
                            />
                        </div>

                        <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "10px"}}>
                            <Button variant="contained" onClick={() => setEditing(true)} color="info" style={{marginRight: "-140px"}}>Edit</Button>
                            <Button variant="contained"  onClick={() => setModalOpen(true)}color="error" style={{marginLeft: "-140px"}}>Delete</Button>
                        </div>
                    </Box>
                </Paper>
            }


            {codeError == false && inviteDeleted == false && editing == true && invite != null && //if invite fetched from server and is editing
                <Paper elevation={3} style={paperStyle}>
                    <h2> Edit Invite </h2>

                    <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    autoComplete="off"
                    >
                        <TextField label="Host Name" fullWidth required 
                            value={ownerName}
                            onChange={(e)=> {
                                setOwnerName(e.target.value) 
                                setNameTouched(true);
                            }}
                            error={nameTouched && ownerName.length === 0}
                        />
                        <TextField label="Event Details" multiline fullWidth required rows={3}
                            value={eventDetails}
                            onChange={(e)=> {
                                setEventDetails(e.target.value) 
                                setDetailsTouched(true);
                            }}
                            error={detailsTouched && eventDetails.length === 0}
                        />
                        <TextField label="Event Address" fullWidth required
                            value={eventAddress}
                            onChange={(e)=> {
                                setEventAddress(e.target.value)
                                setAddressTouched(true);
                            }}
                            error={addressTouched && eventAddress.length === 0}
                        />
                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker label="Event Date" fullWidth 
                                    format='DD/MM/YYYY hh:mm A'
                                    value={dayjs(eventDate)}
                                    onChange={(e)=> {
                                        if(eventDate != null) {
                                            setEventDate(e.$d);
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            required: true,
                                        },
                                    }}
                                    ampm={true}                           
                                />
                            </LocalizationProvider>
                            <TextField label="Time Zone (for intl. events)" style={{width: "67%", marginRight: "-15px"}}
                                value={eventTimezone}
                                onChange={(e)=>setEventTimezone(e.target.value)}
                            />
                        </div>

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
                <Alert severity="success">Invite edited successfully</Alert>
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
                    <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "15px"}}>   
                        <h3> Confirm deletion of your Invite? </h3>
                    </div>

                    <div style={{width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "30px"}}>
                        <Button variant="contained" onClick={() => setModalOpen(false)} color="warning" style={{marginRight: "-40px"}}>Cancel</Button>
                        <Button variant="contained" onClick={submitDeleteForm} color="error" style={{marginLeft: "-40px"}}>Delete</Button>
                    </div>
                </Box>
            </Modal>
        </Container>
    );
}
