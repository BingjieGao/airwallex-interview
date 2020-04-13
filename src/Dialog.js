import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DialogContentText } from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        maxWdth: '1000px',
        width: '35%',
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogTextField: {
        width: '100%'
    },
    textField: {
        marginBottom: '20px'
    },
    formTitle: {
        textAlign: 'center'
    },
    dialogActions: {
        justifyContent: 'center'
    },
    actionButton:{
        width: '100%',
        marginTop: '30px'
    },
    errMessage: {
        textAlign: 'center'
    }
});
export default function InviteDialog(props) {
  const {handleSubmit, handleClose, open, submitResult} = props;
  const defaultValues = {
    username: "John Doe",
    email: "johndoe@airwallex.com",
    confirmedEmail: "Confirmed Email"
}
  const [errorText, setErrorText] = React.useState({
      username: null,
      email: null,
      confirmEmail: null
  });
  const [email, setEmail] = React.useState(defaultValues.email);
  const [confirmedEmail, setConfirmedEmail] = React.useState(defaultValues.confirmedEmail);
  const [username, setUsername] = React.useState(defaultValues.username);
  const [changed, setChanged] = React.useState(false);
  const [buttonString, setButtonString] = React.useState("Send")

  const classes = useStyles();

  const usernameError = (event) =>{
      const regexp = /^[a-zA-Z\s]*$/;
      const username = event.target.value || defaultValues.username;
      const usernameValidator = regexp.test(username);
      let helpText = null;
      if (!usernameValidator) {
          helpText = "Invalid username value"
      }
      setUsername(event.target.value || "");
      setChanged(true);
      setErrorText({
        username: helpText,
        email: errorText.email,
        confirmEmail: errorText.confirmEmail
      })
  }

  const emailError = (event) =>{
      const emailAddr = event.target.value || defaultValues.email;
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setEmail(emailAddr);
    setChanged(true);
    const emailValidator = regexp.test(emailAddr);
    const confirmValidation = emailAddr === confirmedEmail;
    let helpText = null;
    let confirmedHelpText = null;
    if (!emailValidator) {
        helpText = "Invalid email address"
    }
    if (!confirmValidation) {
        confirmedHelpText = "Please confirm the email addresses are the same"
    }
    setErrorText({
      username: errorText.username,
      email: helpText,
      confirmEmail: confirmedHelpText
    })
}

const confirmEmailError = (event) =>{
    const confirmedAddr = event.target.value || defaultValues.confirmedEmail;
    const emailValidator = email === confirmedAddr;
    let helpText = null;
    if (!emailValidator) {
        helpText = "Please confirm the email addresses are the same"
    }
    setConfirmedEmail(confirmedAddr);
    setChanged(true);
    setErrorText({
      username: errorText.username,
      email: errorText.email,
      confirmEmail: helpText
    })
}
const handleDialogAction = () => {
    setChanged(false);
    setButtonString("Sending, please wait...")
    handleSubmit(username, email)
        .then(() => {
            setButtonString("Send");
        })
}

const registration = (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
    classes={{paper: classes.paper}}
  >
    <DialogTitle className={classes.formTitle} id="responsive-dialog-title">{"Request an invite"}</DialogTitle>
    <DialogContent className={classes.dialogContent}>
      <form  noValidate autoComplete="off">
        <div>
            <TextField
                error={!!errorText.username}
                className={classes.textField}
                required={true}
                fullWidth={true}
                defaultValue={defaultValues.username}
                helperText={errorText.username}
                onChange={usernameError}
            />
        </div>
        <div>
            <TextField
            error={!!errorText.email}
            className={classes.textField}
            fullWidth={true}
            required={true}
            defaultValue={defaultValues.email}
            helperText={errorText.email}
            onChange={emailError}
            />
        </div>
        <div>
            <TextField
                error={!!errorText.confirmEmail}
                className={classes.textField}
                fullWidth={true}
                required={true}
                defaultValue={defaultValues.confirmedEmail}
                onChange={confirmEmailError}
                helperText={errorText.confirmEmail}
            />
        </div>
        </form>
    </DialogContent>
    <DialogActions className={classes.dialogActions}>
      <Button 
        autoFocus
        onClick={handleDialogAction}
        color="primary"
        disabled={(!!errorText.confirmEmail || !!errorText.email || !!errorText.username || !changed)}
        >
        {buttonString}
      </Button>
    </DialogActions>
<DialogContentText className={classes.errMessage}>{submitResult.errMessage}</DialogContentText>
  </Dialog>
);

const successDialog = (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
    classes={{paper: classes.paper}}
  >
    <DialogTitle className={classes.formTitle} id="responsive-dialog-title">{"All done!"}</DialogTitle>
    <DialogContent className={classes.dialogContent}>
    You will be one of the first to experience Broccoli & Co, when we launch
    </DialogContent>
    <DialogActions className={classes.dialogActions}>
      <Button 
        autoFocus
        onClick={handleClose}
        color="primary"
        >
        OK
      </Button>
    </DialogActions>
  </Dialog>
)
  return submitResult.registered ? successDialog: registration;
}