import React, { useState } from 'react';
import { Paper, InputBase, Button, IconButton, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, alpha } from '@material-ui/core/styles';
import CircularIndeterminate from '../CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '319px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#900C3F',
    color: '#fff',
    '&:hover': {
      background: alpha('#900C3F', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
  descriptionField: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
}));
export default function AddCard({setOpen, listId}) {
    const classes = useStyle();
    const [cardTitle, setCardTitle] = useState('');
    const [cardDesc, setCardDesc] = useState('');
    const [message, setMessage] = useState("");
    const [opensuccess, setOpenSuccess] = useState(false);
    const [openfailure, setOpenFailure] = useState(false);
    const [isToggle, setisToggle] = useState(false);
    const onCardTitleChange = (e) => {
      setCardTitle (e.target.value);
    }

    const onCardDescChange = (e) => {
      setCardDesc (e.target.value);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSuccess(false);
      setOpenFailure(false)
    };

    const refreshPage = () => {
      setTimeout(() =>{
        window.location.reload(false);
      }, 2000);
    }

    const validate = () => {
    if(cardTitle.length>0 && cardDesc.length>0){
      return true;
    }
    else{
      return false;
    }
    }

    const addCardButton = () => {
      if (validate ()){
      setisToggle(true);
      axios.post('http://localhost:5000/api/addcard',{
      listid: listId,  
      cardtitle: cardTitle,
      carddesc: cardDesc
      }).then (response =>{
        setisToggle(false);
        setOpenSuccess(true);
        setOpenFailure(false);
        setMessage("New Card Added Successfully");
        if (!isToggle){
          refreshPage()
        }
      }).catch((error) => {
        setOpenSuccess(false);
        setOpenFailure(true);
        setMessage("Error occured while adding a new Card. Please Try Again Later.");
        if (!isToggle){
          refreshPage()
        }
      });
    }
    else{
      setOpenSuccess(false);
      setOpenFailure(true);
      setMessage("Please fill Card Title and Description");
    }
    }
    return (
      <div>
        <Snackbar open={opensuccess}  anchorOrigin={{vertical: 'top', horizontal: 'center' }} autoHideDuration={9000} onClose={handleClose}>
            <Alert variant="filled" onClose={handleClose} severity="success" style={{'font-size': '1.15rem'}}>
              {message}
            </Alert>
          </Snackbar>
        <Snackbar open={openfailure} anchorOrigin={{vertical: 'bottom', horizontal: 'center'
      }} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error" style={{'font-size': '1.15rem'}}>
        {message}
        </Alert>
      </Snackbar>
        <div>
          <Paper className={classes.card}>
            <InputBase 
              onChange={onCardTitleChange}
              multiline
              fullWidth
              inputProps={{
                className: classes.input
              }}
              value={cardTitle}
              placeholder= 'Enter a title of this card..'
            />

              <TextField 
              onChange={onCardDescChange}
              className={classes.descriptionField}
              variant='outlined'
              label='Description'
              multiline
              inputProps={{
                className: classes.input
              }}
              value={cardDesc}
              placeholder= 'Enter a description of this card..'
            />    
          </Paper>
        </div>
        <div className={classes.confirm} style={{display:'flex'}}>
          <div>
          <Button className={classes.btnConfirm} onClick={addCardButton}>
              Add Card
          </Button>
          <IconButton onClick={()=> setOpen(false)}>
            <ClearIcon />
          </IconButton>
          </div> {isToggle && <div>
          <CircularIndeterminate />
          </div>
        }
        </div>
      </div>
    );
}   