const express = require('express');
const cors = require('cors');
const app = express();

// DATABASE
const pool = require('./dbConnection');

app.use(cors());
app.use(express.json())

app.get ('/api/list', async (req,res) => {

    try {
        const allList = await pool.query(
            "select list_id, list_name from trello_list;"
        )
        res.json(allList.rows);
    } 
    catch (error) {
      console.error(error.message)  
    }

})

app.get ('/api/cards/:listid', async (req,res) => {
    const {listid}  = req.params;
    try {
        const allCards = await pool.query(
            "select card_id, card_title, card_description from trello_cards where list_id= $1 ",
            [listid]
        )
        res.json(allCards.rows);
    } 
    catch (error) {
      console.error(error.message)  
    }

})

app.post('/api/addcard', async (req, res) => {
    try {
        const {listid, cardtitle, carddesc} = req.body;

        const newCard = await pool.query(
            "Insert into trello_cards (list_id,card_title,card_description,created_date) values ($1, $2, $3, current_date) RETURNING *",
            [listid, cardtitle, carddesc]
        );
        
        res.json(newCard.rows[0]);
    }
    catch (error) {
      console.error(error.message)
    }
});

app.post('/api/addlist', async (req, res) => {
    try {
        const {listname} = req.body;

        const newList = await pool.query(
            "Insert into trello_list ( list_name, created_date) values ($1, current_date) RETURNING *",
            [listname]
        );
        
        res.json(newList.rows[0]);
    }
    catch (error) {
      console.error(error.message)
    }
});

app.put('/api/updatelistname/:listid', async (req, res) => {
    try {
        const {listid} = req.params;
        const {newlistname} = req.body;

        const updateListName = await pool.query(
            "UPDATE trello_list SET list_name = $1 WHERE list_id = $2",
            [newlistname, listid]
        );
        res.json(updateListName.rowCount)
    }
    catch (error) {
        console.error(error);    
    }
});

app.delete('/api/deletelist/:listid', async (req, res) => {
    try {
        const {listid} = req.params;

        const deletecards = await pool.query(
            "Delete from trello_cards where list_id = $1",
            [listid]
        );
        
        
        const deletelist = await pool.query(
            "Delete from trello_list where list_id= $1",
            [listid]
        );
        
        res.json(deletelist.rowCount);
    }
    catch (error) {
        console.error(error);    
    }
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening to port..${port}`)); 