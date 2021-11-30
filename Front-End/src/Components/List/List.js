import React, { useState, useEffect } from 'react';
import { Paper,CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListName from './ListName'
import ListCard from '../Card/Card.js'
import Addcardbutton from '../Card/AddCardButton';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
const useStyle = makeStyles((theme) => ({
    root: {
      width: '335px',
      backgroundColor: '#EBECF0',
      marginLeft: theme.spacing(3),
      marginTop: theme.spacing(4),
    },
    cardContainer: {
      marginTop: theme.spacing(4),
    },
  }));

export default function List({listName , listId}) {
    const classes = useStyle();
    const [trelloCards, setTrelloCards] = useState([]);
    const [message, setMessage] = useState("");
    const [openfailure, setOpenFailure] = useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenFailure(false);
    }

    useEffect(() => {
      const someFunc = () => {
       axios.get(`http://localhost:5000/api/cards/${listId}`, {
        }).then((response) => {
          setTrelloCards(response.data);
        }).catch((error) => {
          setOpenFailure(true);
          setMessage("Error occured while retrieving Cards. Please Try Again Later.");
        });
    }
      someFunc()
    }, [listId])
return(
    <div>
        <Snackbar open={openfailure} anchorOrigin={{vertical: 'bottom', horizontal: 'center'
      }} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error" style={{'font-size': '1.15rem'}}>
        {message}
        </Alert>
      </Snackbar>
        <Paper className={classes.root}>
            <CssBaseline/>
           <ListName listname = {listName} listId = {listId} />
           {trelloCards.map((data) =>(
            <ListCard cardId= {data.card_id} cardTitles = {data.card_title} cardDesc= {data.card_description}  />
            ))}
            <Addcardbutton listId= {listId}/>
        </Paper>
    </div>
)
}