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





// const memorySort = (sortOrder:string, sortField:string, data:any) => {
            

//     function dynamicSort(sortOrder:string, sortField:string) {
//         // var nSortOrder = 1;

//         // if(sortOrder === "asc") {
//         //     nSortOrder = -1;
//         // }

//         return function (a, b) {
//             /* next line works with strings and numbers, 
//             * and you may want to customize it to your needs
//             */

//             const nameA = a[sortField].toUpperCase(); // ignore upper and lowercase
//             const nameB = b[sortField].toUpperCase(); // ignore upper and lowercase
            
//             var result = (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;

//             return result;
//         }
//     }


//     // function compare( a, b ) {
//     //     console.log(arguments)

//     //     console.log(a[sortField])
        
//     //     console.log(b[sortField])

//     //     if ( a[sortField] < b[sortField] ) {
//     //       return -1;
//     //     }
//     //     if ( a[sortField] > b[sortField] ) {
//     //       return 1;
//     //     }
//     //     return 0;
//     // }
//     let sortedData;
    
//     if(sortOrder === 'asc') {
//         sortedData =  data.sort(dynamicSort(sortOrder, sortField));
//     }else {
//         sortedData =  data.sort(dynamicSort(sortOrder, sortField)).reverse();
//     }

//     return sortedData;

    
// }


// const memoryFilter = (searchFields:any, data:any) => {
    
//     if(typeof searchFields[0] === 'object') {
//         delete(searchFields[0]);
//     }
    
//     function dynamicFilter(searchFields:any) {
    
//         return function (a) {
//             /* next line works with strings and numbers, 
//             * and you may want to customize it to your needs
//             */
//             var results = [];
//             let found = 0;
//             for(let key in searchFields) {

//                 results.push((a[key].toLowerCase()).indexOf(searchFields[key].toLowerCase()));
                
//                 found = 0;
                
//                 for(let i = 0; i <= results.length - 1; i++ ) {
//                     if(results[i] > -1) {
//                         ++found;
//                     }
//                 }
//             }
//             let result = 0;
//             if(results.length ===  found) {
//                 result = 1;
//             }else {
//                 result = 0;
//             }

//             return result;
//         }
//     }

//     return data.filter(dynamicFilter(searchFields));
// }    
