import express, { Express, Request, Response } from "express";
import http from "http"
import bodyparser from "body-parser"


const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
const server = http.createServer(app);

const hostname = '192.168.0.101'
const port = process.env.PORT || 4800;

/*Ruteo*/
app.use(require('../routes/index'))
app.use(require('../routes/users'))
const alarmFunction = require('../routes/alarm')

app.listen(4800, () => {
    console.log('listening on *:4800');
  });




//setInterval(alarmFunction, 6000); 
