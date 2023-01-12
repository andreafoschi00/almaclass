const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.get('/api/classroom', (req, res) => {
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT * FROM aule_2022 WHERE aula_codice LIKE \'6137%\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send("Cannot fetch data");
      } else {
          res.send(response);
      }
  });
})
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});