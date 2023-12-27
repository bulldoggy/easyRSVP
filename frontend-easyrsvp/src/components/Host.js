import * as React from 'react';
import { Button, Container, Paper, Snackbar, Alert, Modal, Box, TextField, TableCell, Table, TableHead, TableRow, TableSortLabel, TableContainer, TableBody, TablePagination } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import dayjs from "dayjs";
import Error from './Error';
import DeleteIcon from '@mui/icons-material/Delete';
import copy from "copy-to-clipboard";

export default function Host() {
    const paperStyle = { padding: "10px 20px", width: 850, margin: "20px auto" };
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        //boxShadow: 24,
        p: 4,
        borderRadius: '6px',
    };
    const linkDivStyle = { width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "-15px" };

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
    const [responses, setResponses] = useState([]);

    const [editing, setEditing] = useState(false);
    const [codeError, setCodeError] = useState(null);
    const [inviteDeleted, setInviteDeleted] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [notesModalOpen, setNotesModalOpen] = useState(false);
    const [deleteRsvpModalOpen, setDeleteRsvpModalOpen] = useState(false);

    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('guestName');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [notesToView, setNotesToView] = useState('');
    const [rsvpCodeToDelete, setRsvpCodeToDelete] = useState('');
    const [responseLink, setResponseLink] = useState('');
    const [copySnackbar, setCopySnackbar] = useState(false)
    const [deleteRsvpSnackbar, setDeleteRsvpSnackbar] = useState(false)
    const [attendingCount, setAttendingCount] = useState(0);

    let timezone = "Local Time";

    const handlePageChange = (event, newPage) => {
        setPage(newPage);

    }

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value), 10);
        setPage(0);
    }

    const copyResponseLink = () => {
        setCopySnackbar(true);
        copy(responseLink);
    };

    const handleRequestSort = (property) => (event) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc');
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }

    const sortedRowInformation = (rowArray, comparator) => {
        const stabilizedRowArray = rowArray.map((e1, index) => [e1, index]);
        stabilizedRowArray.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order;
            return a[1] - b[1];
        })

        return stabilizedRowArray.map((e1) => e1[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }

        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }

    const submitEditForm = (e) => {
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
            const inviteEditDTO = { inviteCode, ownerName, eventDetails, eventAddress, eventDate, timezone };
            fetch("https://easyrsvp-web.onrender.com/rsvp/editInvite", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inviteEditDTO)
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

        fetch("https://easyrsvp-web.onrender.com/rsvp/deleteInvite?code=" + invite.inviteCode, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                setInviteDeleted(true);
                setModalOpen(false);
            })
    }

    const submitDeleteRsvp = (e) => {
        e.preventDefault();

        fetch("https://easyrsvp-web.onrender.com/rsvp/deleteResponse?code=" + rsvpCodeToDelete, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                fetchInvite();
                setDeleteRsvpSnackbar(true);
                setDeleteRsvpModalOpen(false);
            })
    }

    const fetchInvite = () => {
        fetch("https://easyrsvp-web.onrender.com/rsvp/host?code=" + window.location.search.substring(1))
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then(result => {
                let rsp = result.responses;
                let count = 0;
                for (let i = 0; i < rsp.length; i++) {
                    if (result.responses[i].guestDecision === 'Yes') {
                        count++;
                    }
                }
                setAttendingCount(count);
                setInvite(result);
                setResponses(rsp);
                setCodeError(false);
            })
            .catch((error) => {
                setCodeError(true);
            });
    }

    useEffect(() => {
        fetchInvite();
    }, [])

    useEffect(() => {
        if (invite != null) {
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
            setResponseLink(`https://easyrsvp.netlify.app/response?` + invite.responseCode);
        }
    }, [invite])

    return (
        <Container style={{ paddingTop: "60px" }}>
            {inviteDeleted === true && //code is deleted
                <Error
                    message={"Your invite has been deleted"}
                />
            }

            {codeError === true && inviteDeleted === false && //code is invalid
                <Error
                    message={"Invalid link provided, check if your host link is correct"}
                />
            }

            {codeError === false && inviteDeleted === false && editing === false && invite != null &&//if invite fetched from server and not editing
                <Paper elevation={3} style={paperStyle}>
                    <h2> Your Invite </h2>

                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        autoComplete="off"
                    >

                        <h4 style={{ display: "flex", marginBottom: "-3px" }}>Host:</h4>
                        <TextField variant="standard" fullWidth disabled multiline
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
                        <TextField variant="standard" fullWidth disabled multiline
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
                            <div style={{ width: "40%" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DateTimePicker fullWidth disableOpenPicker readOnly
                                        format='DD/MM/YYYY hh:mm A'
                                        sx={{
                                            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            marginTop: "-13px",
                                            marginLeft: "-47px"
                                        }}
                                        value={dayjs(invite.eventDate)}
                                        ampm={true}
                                    />
                                </LocalizationProvider>
                            </div>

                            <TextField variant="standard" multiline fullWidth disabled style={{ width: "75%" }}
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

                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "10px", marginTop: "10px" }}>
                            <Button variant="contained" onClick={() => setEditing(true)} color="info" style={{ marginRight: "-140px" }}>Edit</Button>
                            <Button variant="contained" onClick={() => setModalOpen(true)} color="error" style={{ marginLeft: "-140px" }}>Delete</Button>
                        </div>
                    </Box>
                </Paper>
            }


            {codeError === false && inviteDeleted === false && editing === true && invite != null && //if invite fetched from server and is editing
                <Paper elevation={3} style={paperStyle}>
                    <h2> Edit Invite </h2>

                    <Box
                        component="form"
                        display="flex"
                        flexDirection="column"
                        gap="15px"
                        autoComplete="off"
                    >
                        <TextField label="Host Name" fullWidth required multiline
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
                        <TextField label="Event Address" fullWidth required multiline
                            value={eventAddress}
                            onChange={(e) => {
                                setEventAddress(e.target.value)
                                setAddressTouched(true);
                            }}
                            error={addressTouched && eventAddress.length === 0}
                        />
                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker label="Event Date" fullWidth
                                    format='DD/MM/YYYY hh:mm A'
                                    value={dayjs(eventDate)}
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
                            <TextField label="Time Zone (for intl. events)" style={{ width: "67%", marginRight: "-15px" }}
                                value={eventTimezone}
                                onChange={(e) => setEventTimezone(e.target.value)}
                                multiline
                            />
                        </div>

                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: "15px" }}>
                            <Button variant="contained" onClick={cancelClicked} color="warning" style={{ marginRight: "-140px" }}>Cancel</Button>
                            <Button variant="contained" onClick={submitEditForm} color="success" style={{ marginLeft: "-140px" }}>Submit</Button>
                        </div>
                    </Box>
                </Paper>
            }

            {responses.length > 0 && inviteDeleted === false &&
                <Paper elevation={3} style={paperStyle}>
                    <div style={{ width: "parent", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h2>Guests</h2>
                        <h4 style={{ marginTop: "-10px" }}> {attendingCount} / {responses.length} Attending </h4>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="guestName">
                                        <TableSortLabel
                                            active={valueToOrderBy === "guestName"}
                                            direction={valueToOrderBy === "guestName" ? orderDirection : 'asc'}
                                            onClick={handleRequestSort("guestName")}
                                        >
                                            Name
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="guestMobile">
                                        <TableSortLabel
                                            active={valueToOrderBy === "guestMobile"}
                                            direction={valueToOrderBy === "guestMobile" ? orderDirection : 'asc'}
                                            onClick={handleRequestSort("guestMobile")}
                                        >
                                            Mobile
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="guestDecision">
                                        <TableSortLabel
                                            active={valueToOrderBy === "guestDecision"}
                                            direction={valueToOrderBy === "guestDecision" ? orderDirection : 'asc'}
                                            onClick={handleRequestSort("guestDecision")}
                                        >
                                            Decision
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="guestNotes">
                                        <TableSortLabel
                                            active={valueToOrderBy === "guestNotes"}
                                            direction={valueToOrderBy === "guestNotes" ? orderDirection : 'asc'}
                                            onClick={handleRequestSort("guestNotes")}
                                        >
                                            Notes
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell key="delete">

                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {sortedRowInformation(responses, getComparator(orderDirection, valueToOrderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((response, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {response.guestName}
                                            </TableCell>
                                            <TableCell>
                                                {response.guestMobile}
                                            </TableCell>
                                            <TableCell>
                                                {response.guestDecision}
                                            </TableCell>
                                            <TableCell>
                                                {response.guestNotes.length > 0 &&
                                                    <Button variant="contained" size="small" onClick={() => {
                                                        setNotesModalOpen(true);
                                                        setNotesToView(response.guestNotes);
                                                    }} color="info">View</Button>}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="text" size="small" onClick={() => {
                                                    setDeleteRsvpModalOpen(true);
                                                    setRsvpCodeToDelete(response.guestCode);
                                                }} color="error" style={{ margin: "-20px" }}> <DeleteIcon /> </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 20, { label: "All", value: responses.length }]}
                        component="div"
                        count={responses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Paper>}

            {responses.length === 0 && inviteDeleted === false && codeError === false &&
                <>
                    <Paper elevation={3} style={paperStyle}>
                        <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                            <h4>No responses yet...</h4>
                        </div>
                    </Paper>

                    <Paper elevation={3} style={paperStyle}>
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
                    <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "15px" }}>
                        <h3> Confirm deletion of your Invite? </h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <h4> (Your guests will lose access to their RSVP as well) </h4>
                    </div>

                    <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "30px" }}>
                        <Button variant="contained" onClick={() => setModalOpen(false)} color="warning" style={{ marginRight: "-40px" }}>Cancel</Button>
                        <Button variant="contained" onClick={submitDeleteForm} color="error" style={{ marginLeft: "-40px" }}>Delete</Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={notesModalOpen}
                onClose={() => setNotesModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "15px" }}>
                        <TextField variant="standard" multiline fullWidth disabled
                            sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                            }}
                            InputProps={{
                                disableUnderline: true
                            }}
                            value={notesToView}
                        />
                    </div>

                    <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "30px" }}>
                        <Button variant="outlined" onClick={() => setNotesModalOpen(false)} color="info" size="small">Close</Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={deleteRsvpModalOpen}
                onClose={() => setDeleteRsvpModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "15px" }}>
                        <h3> Confirm deletion of this RSVP ? </h3>
                    </div>

                    <div style={{ width: "parent", display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: "30px" }}>
                        <Button variant="contained" onClick={() => setDeleteRsvpModalOpen(false)} color="warning" style={{ marginRight: "-40px" }}>Cancel</Button>
                        <Button variant="contained" onClick={submitDeleteRsvp} color="error" style={{ marginLeft: "-40px" }}>Delete</Button>
                    </div>
                </Box>
            </Modal>

            <Snackbar
                open={copySnackbar}
                onClose={() => setCopySnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="success">Copied to clipboard</Alert>
            </Snackbar>

            <Snackbar
                open={deleteRsvpSnackbar}
                onClose={() => setDeleteRsvpSnackbar(false)}
                autoHideDuration={2000}
            >
                <Alert severity="success">RSVP has been deleted</Alert>
            </Snackbar>

        </Container>
    );
}
