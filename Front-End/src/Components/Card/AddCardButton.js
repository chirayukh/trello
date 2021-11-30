import React, { useState } from 'react';
import { Collapse, Paper, Typography, Button, Tooltip } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCard from './AddCard';

const useStyle = makeStyles((theme) => ({
    root: {
      width: '300px',
      marginTop: theme.spacing(1),
    },
    addCard: {
      padding: theme.spacing(1, 1, 1, 1),
      margin: theme.spacing(0, 1, 1, 1),
      background: '#581845',
      '&:hover': {
        backgroundColor: alpha('#581845', 0.5),
      },
    },
  }));

export default function Addcardbutton({listId}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
return(
    <div  className={classes.root}>
        <Collapse in={open}>
        <AddCard listId={listId} setOpen = {setOpen}/>
        </Collapse>
        <Collapse in = {!open}>
       <Tooltip title="Add a Card to this List" arrow>
          <Button className={classes.addCard} onClick={()=>setOpen(!open)}>
           <AddCircleOutlineIcon />
           </Button>
        </Tooltip>
        </Collapse>
    </div>
)
}