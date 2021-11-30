import React from 'react';
import { Typography, TextField, Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(1, 1, 1, 2),
      margin: theme.spacing(1),
    },
    descriptionField: {
        marginTop: theme.spacing(1),
      },
  }));

export default function ListCard({cardTitles, cardDesc}) {
    const classes = useStyle();
return(
    <div>
        <Card className={classes.card}>
            <CardContent>
           <Typography>
               {cardTitles}
           </Typography>
          
            <TextField 
              className={classes.descriptionField}
              variant='outlined'
              label='Description'
              multiline
              fullWidth
              inputProps={{
                className: classes.input
              }}
              value={cardDesc}
            />
          
           </CardContent>
        </Card>
    </div>
)
}