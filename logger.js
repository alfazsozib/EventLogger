const fs = require('fs');
const os = require('os');



const EventEmitter = require('events');

class Loger extends EventEmitter {
    log(message){
        this.emit('message',{message});
    }
}


const logger = new Loger();
const logFile = "./eventlog.txt"

const logToFile = (event)=>{
    const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
    fs.appendFileSync(logFile,logMessage); 
}

logger.on('message',logToFile) 

setInterval(()=>{
    const memoryUsage = (os.freemem() / os.totalmem) * 100;
    logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`)
 
},3000)


logger.log('Application Started');
logger.log('Application Event Occured');
