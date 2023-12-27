import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper, Snackbar, Alert } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import dayjs from "dayjs";

export default function Home() {
    const paperStyle = { padding: "10px 20px", width: 850, margin: "20px auto" };
    const linkDivStyle = { width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "-15px" };

    const [ownerName, setOwnerName] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventDate, setEventDate] = useState(dayjs());
    const [eventTimezone, setEventTimezone] = useState('');

    const [nameTouched, setNameTouched] = useState(false);
    const [detailsTouched, setDetailsTouched] = useState(false);
    const [addressTouched, setAddressTouched] = useState(false);

    const [copySnackbar, setCopySnackbar] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)

    const [invite, setInvite] = useState(null);
    const [inviteLink, setInviteLink] = useState('');
    const [responseLink, setResponseLink] = useState('');

    let timezone = "Local Time";

    const copyInviteLink = () => {
        setCopySnackbar(true);
        copy(inviteLink);
    };

    const copyResponseLink = () => {
        setCopySnackbar(true);
        copy(responseLink);
    };

    const submitInvite = (e) => {
        if (ownerName === '' || eventDetails === '' || eventAddress === '' || isNaN(Date.parse(eventDate))) {
            setNameTouched(true);
            setDetailsTouched(true);
            setAddressTouched(true);
            setErrorSnackbar(true);
        } else {
            if (eventTimezone !== '') {
                timezone = eventTimezone;
            } else {
                setEventTimezone(timezone);
            }

            e.preventDefault();
            const inviteCreateDTO = { ownerName, eventDetails, eventAddress, eventDate, timezone };
            fetch("https://easyrsvp-web.onrender.com/rsvp/createInvite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inviteCreateDTO)
            })
                .then(res => res.json())
                .then(result => {
                    setInvite(result);
                })
        }
    }

    useEffect(() => {
        if (invite != null) {
            setInviteLink(`https://easyrsvp.netlify.app/host?` + invite.inviteCode);
            setResponseLink(`https://easyrsvp.netlify.app/response?` + invite.responseCode);
        }
    }, [invite]);

    return (
        <Container style={{ paddingTop: "60px" }}>
            {invite == null && //if invite not created yet
                <Paper elevation={3} style={paperStyle}>
                    <h2> Create a new Invite </h2>

                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        gap="15px"
                        autoComplete="off"
                    >
                        <TextField label="Host Name" multiline fullWidth required 
                            value={ownerName}
                            onChange={(e) => {
                                setOwnerName(e.target.value)
                                setNameTouched(true);
                            }}
                            error={nameTouched && ownerName.length === 0}
                        />
                        <TextField label="Event Details" multiline fullWidth required minRows={3}
                            value={eventDetails}
                            onChange={(e) => {
                                setEventDetails(e.target.value)
                                setDetailsTouched(true);
                            }}
                            error={detailsTouched && eventDetails.length === 0}
                        />
                        <TextField label="Event Address" multiline fullWidth required
                            value={eventAddress}
                            onChange={(e) => {
                                setEventAddress(e.target.value)
                                setAddressTouched(true);
                            }}
                            error={addressTouched && eventAddress.length === 0}
                        />
                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DateTimePicker label="Event Date" fullWidth
                                        format='DD/MM/YYYY hh:mm A'
                                        value={eventDate}
                                        onChange={(e) => {
                                            if (eventDate != null) {
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
                            </div>
                            <div style={{ minWidth: "65%" }}>
                                <TextField label="Time Zone (for intl. events)"
                                    value={eventTimezone}
                                    onChange={(e) => setEventTimezone(e.target.value)}
                                    style={{ minWidth: "100%" }}
                                    multiline
                                />
                            </div>
                        </div>

                        <div style={{ maxWidth: "800px" }}>
                            <Button variant="contained" color="success" onClick={submitInvite}>Submit</Button>
                        </div>
                    </Box>
                </Paper>
            }


            {invite != null && //if invite created
                <>
                    <Paper elevation={3} style={paperStyle}>
                        <h2> Invite created! </h2>
                        <p style={{fontSize: "13px", marginTop: "-18px", color: "gray"}}>(Note: this invite will be deleted 90 days after the event)</p>

                        <Box
                            component="form"
                            display="flex"
                            flexDirection="column"
                            autoComplete="off"
                        >

                            <h4 style={{ display: "flex", marginBottom: "-3px" }}>Host:</h4>
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

                            <h4 style={{ display: "flex", marginBottom: "-3px" }}>Details:</h4>
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

                            <h4 style={{ display: "flex", marginBottom: "-3px" }}>Address:</h4>
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


                            <h4 style={{ display: "flex", marginBottom: "0px" }}>Date:</h4>
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

                                <TextField id="outlined-basic" variant="standard" multiline fullWidth disabled style={{ width: "65%" }}
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

                            <br />
                        </Box>
                    </Paper>

                    <Paper elevation={3} style={paperStyle}>
                        <h2> Save the links below! </h2>

                        <h4> Use this link to view your invite and guest responses </h4>
                        <div style={linkDivStyle}>
                            <TextField fullWidth
                                value={inviteLink}
                                InputProps={{
                                    readOnly: true
                                }}
                                style={{ marginRight: "20px" }}
                            />
                            <Button onClick={copyInviteLink} variant="contained" size="small">COPY</Button>
                        </div>

                        <h4> Share this link to your guests to let them respond </h4>
                        <div style={linkDivStyle}>
                            <TextField fullWidth
                                value={responseLink}
                                InputProps={{
                                    readOnly: true
                                }}
                                style={{ marginRight: "20px" }}
                            />
                            <Button onClick={copyResponseLink} variant="contained" size="small">COPY</Button>
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
