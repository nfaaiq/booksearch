import app from './app';
// require('../src/database/db');
var events = require('events');


var em = new events.EventEmitter();

em.on('startEvent', async function (in_data) {

  

});

const startServer = async function () {
  try {
      app.listen(process.env.PORT)
      // eslint-disable-next-line no-console
      console.log(`Server has started on port: ${process.env.PORT}`)
   
      em.emit('startEvent', 'Data synced.');

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not start the app: `, error)
  }
}
startServer();