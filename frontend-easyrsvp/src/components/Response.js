import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Snackbar, Alert, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import Error from './Error';

export default function Home() {
    const paperStyle = { padding: "10px 20px", width: 800, margin: "20px auto" };
    const linkDivStyle = { width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "-15px" };

    const [invite, setInvite] = useState(null);
    const [inviteCode, setInviteCode] = useState('');
    const [guestName, setGuestName] = useState('');
    const [guestMobile, setGuestMobile] = useState('');
    const [guestDecision, setGuestDecision] = useState('');
    const [guestNotes, setGuestNotes] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [mobileTouched, setMobileTouched] = useState(false);

    const [copySnackbar, setCopySnackbar] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)

    const [response, setResponse] = useState(null);
    const [guestLink, setGuestLink] = useState('');
    const [codeError, setCodeError] = useState(null);

    const copyGuestLink = () => {
        setCopySnackbar(true);
        copy(guestLink);
    };

    const submitResponse = (e) => {
        if (guestName === '' || guestMobile === '' || guestDecision === '') {
            setNameTouched(true);
            setMobileTouched(true);
            setErrorSnackbar(true);
        } else {
            e.preventDefault();
            const responseCreateDTO = { inviteCode, guestName, guestMobile, guestDecision, guestNotes };

            fetch("https://easyrsvp.onrender.com/rsvp/createResponse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(responseCreateDTO)
            })
                .then(response => response.json())
                .then(result => {
                    setResponse(result);
                })
        }
    }

    useEffect(() => {
        fetch("https://easyrsvp.onrender.com" + window.location.pathname + window.location.search)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then(result => {
                setInvite(result);
                setInviteCode(result.inviteCode);
                setCodeError(false);
            })
            .catch((error) => {
                setCodeError(true);
            });
    }, [])

    useEffect(() => {
        if (response != null) {
            setGuestLink(`https://easyrsvp.onrender.com/rsvp/guest?code=` + response.guestCode);
        }
    }, [response]);

    return (
        <Container style={{ paddingTop: "60px" }}>
            {codeError === true && //code is invalid
                <Error
                    message={"Invalid link provided, contact your host to check if the invite link is still active"}
                />
            }

            {codeError === false && invite != null && //if invite fetched from server
                <Paper elevation={3} style={paperStyle}>
                    <h2> You have been invited! </h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >

                        <h4 style={{ float: "left", marginBottom: "-5px" }}>Host:</h4>
                        <TextField variant="standard" multiline fullWidth disabled
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

                        <h4 style={{ float: "left", marginBottom: "-5px" }}>Details:</h4>
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

                        <h4 style={{ float: "left", marginBottom: "-5px" }}>Address:</h4>
                        <TextField variant="standard" multiline fullWidth disabled
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


                        <div style={{ width: "parent", display: "flex", marginBottom: "-25px", marginTop: "-12px" }}>
                            <h4>Date:</h4>
                        </div>

                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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

                            <TextField variant="standard" fullWidth disabled style={{ width: "85%" }}
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
                    </Box>
                </Paper>
            }

            {codeError === false && response === null && //if response not created yet
                <Paper elevation={3} style={paperStyle}>
                    <h2> RSVP below now! </h2>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        autoComplete="off"
                    >
                        <TextField label="Name" fullWidth required
                            value={guestName}
                            onChange={(e) => {
                                setGuestName(e.target.value)
                                setNameTouched(true);
                            }}
                            error={nameTouched && guestName.length === 0}
                        />
                        <TextField label="Mobile Number" fullWidth required
                            value={guestMobile}
                            onChange={(e) => {
                                setGuestMobile(e.target.value)
                                setMobileTouched(true);
                            }}
                            error={mobileTouched && guestMobile.length === 0}
                        />

                        <FormControl >
                            <FormLabel>Attendance *</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e) => {
                                    setGuestDecision(e.target.value)
                                }}
                                value={guestDecision}
                            //error={decisionTouched && guestDecision.length === 0}
                            >
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                                <FormControlLabel value="Unsure" control={<Radio />} label="Unsure" />
                            </RadioGroup>
                        </FormControl>

                        <TextField label="Additional Notes" multiline fullWidth rows={3}
                            value={guestNotes}
                            onChange={(e) => {
                                setGuestNotes(e.target.value)
                            }}
                        />

                        <Button variant="contained" onClick={submitResponse} color="success">Submit</Button>
                    </Box>
                </Paper>
            }

            {codeError === false && response != null && //if response already created 
                <>
                    <Paper elevation={3} style={paperStyle}>
                        <h2> Your RSVP has been sent! </h2>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <h4 style={{ float: "left", marginBottom: "-5px" }}>Guest:</h4>
                            <TextField variant="standard" fullWidth disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    },
                                }}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                value={guestName}
                            />

                            <h4 style={{ float: "left", marginBottom: "-5px" }}>Mobile:</h4>
                            <TextField variant="standard" fullWidth disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    },
                                }}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                value={guestMobile}
                            />

                            <h4 style={{ float: "left", marginBottom: "-5px" }}> Attendance:</h4>
                            <TextField variant="standard" multiline fullWidth disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    },
                                }}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                value={guestDecision}
                            />

                            <h4 style={{ float: "left", marginBottom: "-5px" }}> Additional Notes:</h4>
                            <TextField variant="standard" multiline fullWidth disabled
                                sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    },
                                }}
                                InputProps={{
                                    disableUnderline: true
                                }}
                                value={guestNotes}
                            />
                        </Box>
                    </Paper>

                    <Paper elevation={3} style={paperStyle}>
                        <h2> Save the link below! </h2>

                        <h4> Use this personalized link to view and edit your response in future</h4>
                        <div style={linkDivStyle}>
                            <TextField fullWidth
                                value={guestLink}
                                InputProps={{
                                    readOnly: true
                                }}
                                style={{ marginRight: "20px" }}
                            />
                            <Button onClick={copyGuestLink} variant="contained" size="small">COPY</Button>
                        </div>

                        <br />
                    </Paper>
                </>
            }

            <Snackbar
                open={copySnackbar}
                onClose={() => setCopySnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="success">Copied to clipboard</Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbar}
                onClose={() => setErrorSnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="error">Fill in all required fields</Alert>
            </Snackbar>
        </Container>
    );
}
