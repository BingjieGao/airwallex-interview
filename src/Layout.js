import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    boxSizing: 'border-box'
  },
  container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 144px);',
    //   margin: '0 auto -50px'
    //   height: '100%'
  },
  footer: {
    position : 'absolute',
    bottom : 0,
    width:'100%',
    height : '80px',
    borderTop: '2px solid gray',
    textAlign: 'center'
  }
}));

export default function Layout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>Broccoli & Co</Toolbar>
      </AppBar>
      <Container className={classes.container}>
        {props.children}
      </Container>
      <div className={classes.footer}>
        <Typography variant="body1" component="p" gutterBottom>
            Made with &hearts; in Melbourne.
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
            @ 2016 Broccoli & Co. All rights reserved.
        </Typography>
      </div>
    </div>
  );
}