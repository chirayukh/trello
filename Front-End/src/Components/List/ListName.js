import React, { useState } from 'react';
import { Typography, InputBase, Button, Tooltip } from '@material-ui/core';
import { makeStyles, alpha} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
  editableTitleContainer: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: theme.spacing(1)
  },
  input: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: theme.spacing(1),
    '&:focus': {
      background: '#ddd',
    },
  },
  delbutton:{
    marginTop: theme.spacing(1)
  },
  delIcon:{
    color: '#BA0505',
    '&:hover': {
      color: alpha('#BA0505', 0.5),
    },
    
  }

}));
export default function ListName( {listname , listId} ) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [opensuccess, setOpenSuccess] = useState(false);
  const [openfailure, setOpenFailure] = useState(false);
  const [newListName, setNewListName] = useState(listname);

  const onListNameChange = (e) => {
    setNewListName (e.target.value);
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

const updateListTitle = (newListName, listId) => {
  axios.put(`http://localhost:5000/api/updatelistname/${listId}`, {
    newlistname: newListName
}).then((response) => {
          setOpenSuccess(true);
          setMessage("List name Updated");
          if(response.data === 1){
          refreshPage()
          }

        }).catch((error) => {
          setOpenFailure(true);
          setMessage("Error occured while updating list Name. Please Try Again Later.");
        });
}

const deleteList = () => {
  axios.delete(`http://localhost:5000/api/deletelist/${listId}`, {
}).then((response) => {
          setOpenSuccess(true);
          setMessage("List deleted successfully");
          if(response.data === 1){
          refreshPage()
          }

        }).catch((error) => {
          setOpenFailure(true);
          setMessage("Error occured while deleting the list. Please Try Again Later.");
        });
}

  const handleOnBlur = () => {
    updateListTitle(newListName, listId);
    setOpen(false);
  };
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
      {open ? (
        <div>
          <InputBase
            onChange={onListNameChange}
            autoFocus
            value={newListName}
            inputProps={{
              className: classes.input,
            }}
            fullWidth
            onBlur={handleOnBlur}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick={() => setOpen(!open)}
            className={classes.editableTitle}
          >
              {listname}
          </Typography>
          <Tooltip title="Delete List" arrow>
          <Button className={classes.delbutton} onClick={deleteList}>
            <DeleteIcon className={classes.delIcon} />
          </Button>
         </Tooltip>
        </div>
      )}
    </div>
  );
}
