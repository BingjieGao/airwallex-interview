import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InviteDialog from "./Dialog";
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 800,
    margin: "0 auto",
    textAlign: 'center'
  },
});

export default function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState({
      registered: false,
      errMessage: ""
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setSubmitResult({
        registered: false,
      errMessage: ""
    })
    setOpen(true);
  };
  const handleSubmit = (username, email) => {
    const submitData = {
        name: username,
        email,
    }
    return axios.post('/login',submitData)
      .then(function (response) {
        if (response.status === 200 && response.data === "Registered") {
            setSubmitResult({
            registered: true,
              errMessage: ""
            })
        }
      })
      .catch(function (error) {
        console.log(error.response);
        setSubmitResult({
            registered: false,
            errMessage: error.response.data.errorMessage
        })
      });

  }
  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        A better way to enjoy everyday
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Be the first to know when we lunch
      </Typography>
      <Button variant="contained" onClick={handleClickOpen}>Request an invite</Button>
      <InviteDialog handleSubmit={handleSubmit} handleClose={handleClose} open={open} submitResult={submitResult}/>
    </div>
  );
}