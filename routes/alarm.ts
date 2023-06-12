const now = new Date();

function alarmFunction() {
    const currentminute = now.getMinutes();
    console.log(currentminute);
    //recuerda que tiene que igualaerse a la gora del alarma    
  }
  
  module.exports = alarmFunction;