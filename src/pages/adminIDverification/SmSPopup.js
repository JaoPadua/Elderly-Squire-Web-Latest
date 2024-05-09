import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = {
  dialogTitle: {
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '16px',
  },
  dialogContent: {
    padding: '16px',
  },
  dialogActions: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
};

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: '15px',
  },
  dialogContent: {
    padding: '20px',
    paddingtop: "10px"
  },
  dialogActions: {
    padding: '16px',
    backgroundColor: '#f5f5f5',
  },
  sendButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
}));



function SmSPopup({userID}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = ()=>{
    console.log('testing')
  }
  return (
    <>
    <Button variant="outlined" color= "primary" onClick={handleClickOpen}>
      Send SMS
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>
        Send SMS ?
        <Divider />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Send SMS to:
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Name"
              type="text"
              defaultValue={"testing"}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Mobile Phone"
              type="number"
              defaultValue={"95717571571"}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    +63
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
          />
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" className={classes.sendButton}>Send Message</Button>
      </DialogActions>
    </Dialog>
  </>
);
}


export default SmSPopup