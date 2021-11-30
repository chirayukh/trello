import React, { useState } from 'react';
import { Collapse, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddList from './AddList';

const useStyle = makeStyles((theme) => ({
    root: {
      width: '335px',
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(4),
    },
    addCard: {
      width: '335px',
      padding: theme.spacing(1, 1, 1, 1),
      margin: theme.spacing(0, 1, 1, 1),
      background: '#EBECF0',
      '&:hover': {
        backgroundColor: alpha('#EBECF0', 0.5),
      },
    },
  }));

export default function Addlistbutton({listId}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
return(
    <div  className={classes.root}>
        <Collapse in={open}>
        <AddList listId={listId} setOpen = {setOpen}/>
        </Collapse>
        <Collapse in = {!open}>
        <Button className={classes.addCard} onClick={()=>setOpen(!open)}>
        <AddCircleOutlineIcon style={{marginRight:'10px'}}/>
           <Typography>
               Add a new List
           </Typography>
        </Button>
        </Collapse>
    </div>
)
}