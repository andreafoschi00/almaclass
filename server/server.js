const express = require("express");
const request = require("request");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.get('/api/classroom/', (req, res) => {
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT * FROM aule_2022 WHERE aula_codice LIKE \'6137%\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/classroom/details/', (req, res) => {
  const aula_codice = req.query.aula_codice;
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT * FROM aule_2022 WHERE aula_codice =\'' + aula_codice + '\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/courses/', (req, res) => {
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT STRING_AGG(DISTINCT(i.corso_codice), \',\') AS corso_codice, c.corso_descrizione, c.tipologia, c.ambiti FROM orari_2022 AS o, insegnamenti_2022_it AS i, corsi_2022_it AS c WHERE i.corso_codice = c.corso_codice AND o.componente_id = i.componente_id AND o.aula_codici LIKE \'6137%\' GROUP BY c.corso_descrizione, c.tipologia, c.ambiti, c.durata ORDER BY c. corso_descrizione ASC',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/courses/details/', (req, res) => {
  const corso_codice = req.query.corso_codice;
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT * FROM corsi_2022_it WHERE corso_codice=\'' + corso_codice + '\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/teachings/', (req, res) => {
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql=SELECT i.corso_codice, i.materia_codice, i.materia_descrizione, i.tipo, i.docente_codice, i.docente_nome, MIN(i.componente_id) AS componente_id, MIN(i.componente_padre) AS componente_padre, MIN(componente_radice) AS componente_radice, i.componente_mutuazione FROM insegnamenti_latest_it AS i WHERE (i.componente_padre IS NULL AND i.componente_id IN (SELECT i2.componente_radice FROM insegnamenti_latest_it AS i2, orari_latest AS o WHERE i2.componente_id = o.componente_id AND o.aula_codici  LIKE \'6137%\' GROUP BY i2.componente_radice)) OR ((i.tipo LIKE \'sdoppiamento\' OR (i.tipo LIKE \'modulo\' AND i.url <> \'\') OR (i.tipo LIKE \'modulo\' AND docente_codice = \'\')) AND (i.materia_codice, i.componente_radice) IN (SELECT i2.materia_codice, i2.componente_radice FROM insegnamenti_latest_it AS i2, orari_latest AS o WHERE i2.componente_id = o.componente_id AND o.aula_codici LIKE \'6137%\' GROUP BY i2.materia_codice, i2.componente_radice)) GROUP BY i.componente_id, i.corso_codice, i.materia_codice, i.materia_descrizione, i.tipo, i.docente_codice, i.docente_nome, i.componente_mutuazione ORDER BY i.materia_descrizione',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/teachings/details/', (req, res) => {
  const componente_id = req.query.componente_id;
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT i.corso_codice, i.materia_descrizione, i.docente_nome, i.lingua, i.componente_id, c.corso_descrizione FROM insegnamenti_2022_it AS i, corsi_2022_it AS c WHERE i.corso_codice = c.corso_codice AND componente_id=\'' + componente_id + '\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/courses/allteachings/', (req, res) => {
  const corso_codice = req.query.corso_codice;
  request.get({
      url: 'https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT i.corso_codice, i.materia_descrizione, i.docente_nome, i.lingua, i.componente_id FROM insegnamenti_2022_it AS i, corsi_2022_it AS c WHERE i.corso_codice = c.corso_codice AND c.corso_codice=\'' + corso_codice + '\'',
      json: true
  }, (error, response) => {
      if(error) {
          return res.send(error);
      } else {
          res.send(response);
      }
  });
})

app.get('/api/classroom/allteachingsinclassroom/', (req, res) => {
    let aula_codice = req.query.aula_codice;
    aula_codice = aula_codice.substring(5, aula_codice.length);
    request.get({
        url: `https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT o.inizio, o.fine, o.componente_id, i.materia_descrizione FROM orari_2022 AS o, insegnamenti_2022_it AS i WHERE o.aula_codici LIKE \'%${aula_codice}%\' AND o.componente_id = i.componente_id ORDER BY o.inizio, o.fine ASC`,
        json: true
    }, (error, response) => {
        if(error) {
            return res.send(error);
        } else {
            res.send(response);
        }
    });
 })

 app.get('/api/teachings/allclassroomsinteaching/', (req, res) => {
    const componente_id = req.query.componente_id;
    request.get({
        url: `https://dati.unibo.it/api/3/action/datastore_search_sql?sql= SELECT o.inizio, o.fine, o.aula_codici, a.aula_nome, a.aula_codice FROM orari_2022 AS o, aule_2022 AS a WHERE o.componente_id=${componente_id} AND o.aula_codici LIKE CONCAT('%', a.aula_codice, '%') ORDER BY o.inizio, o.fine ASC`,
        json: true
    }, (error, response) => {
        if(error) {
            return res.send(error);
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