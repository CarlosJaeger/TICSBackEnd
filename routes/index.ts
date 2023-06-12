import { Router } from "express";

const pool = require('../src/postgres')
const router = Router();

router.get('/', (req , res ) => {
    res.send('Hello World From the Typescript Server!')

});

/* Gets the data from db for graphs */
router.get('/Grafico',(req,res)=>{
    pool.query('SELECT * FROM registre ORDER BY time_added DESC LIMIT 100;', (error:any, results:any) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
});

/* Puts the data into db */
router.post('/',(req,res)=>{
  const DeviceID = req.body.DeviceID;
  const LightData = req.body.LightData;
   pool.query('INSERT INTO registre (device_id, lightlevel) VALUES ($1, $2) RETURNING *', [DeviceID, LightData],(error:any, results:any) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
});


function alarmFunction() {
  // This code will run every minute
  console.log('Alarm triggered!');
  // Add your alarm logic here
}



module.exports = router;


