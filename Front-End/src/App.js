import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from './Components/List/List'
import LinearIndeterminate from './Components/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Addlistbutton from './Components/List/AddListButton';
import axios from "axios";
import { Paper, Typography } from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
  root: {
    display : 'flex'
  },
  headingtext:{
    fontFamily: 'cursive',
    fontSize: '2rem',
    color: 'white',
    marginLeft: theme.spacing(1),
    fontStyle: 'italic'
  }
}));

function App() {
const classes = useStyle();
const [trelloList, setTrelloList] = useState([]);
const [message, setMessage] = useState("");
const [openfailure, setOpenFailure] = useState(false);
const [isToggle, setisToggle] = useState(false);



const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenFailure(false);
}

  useEffect(() => {
    const someFunc = () => {
      setisToggle(true);
      axios.get('http://localhost:5000/api/list', {
  
      })
      .then((response) => {
        setTrelloList(response.data);
        setisToggle(false);
      })
      .catch((error) => {
        setisToggle(false);
        setOpenFailure(true);
        setMessage("Error occured while retrieving the Lists and Cards. Please Try Again Later.");

      });
  }
    someFunc()
  }, [])

  return (
    <div >  
      <Typography className= {classes.headingtext}>
          Welcome! Add your List here :
        </Typography>
       
      <div className={classes.root}>
      {isToggle && <div style={{ position: 'absolute', zIndex: 110, top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center',background: 'rgba(255,255,255,1)' }}>
          <LinearIndeterminate />
        </div>}
        <Snackbar open={openfailure} anchorOrigin={{vertical: 'bottom', horizontal: 'center'
      }} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error" style={{'font-size': '1.15rem'}}>
        {message}
        </Alert>
      </Snackbar>

          {trelloList.map((data) => (
            <div>
            <List listName = {data.list_name} listId= {data.list_id} />
            </div>  
          ))}
        <Addlistbutton />
        </div>
    </div>
  );
} 

export default App;
