const http = require('../utils/http-constanst');
const axios = require('axios');
const fs = require('fs')

class MapQuestService {

    /**
     *  
     * @param {*} data 
     */
    async traceRoute(data) {
        try {
            const { from, to} = data;
            const linkIds = fs.readFileSync('database/linkIds.txt',{encoding:'utf8'})
            
            let route = []
            await axios.get(process.env.URL_MAPQUEST +`/route?key=${process.env.KEY}`,{
             params: {
              from: from,
              to: to,
              routeType: 'bicycle',
              mustAvoidLinkIds: linkIds,
              cyclingRoadFactor: 0.1
            }
            })
            .then(function (response) {
             route = response.data;
            })
            .catch(function (error) {
         
             console.log(error)
              throw({code:http.BAD_REQUEST, message: error })
            })
            .finally(function () {
             // always executed
            });  

            return { code: http.OK, route};

        } catch (error) {
            console.log('Entrou nessa porra')
            throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
        }
    }

    async addInMustAvoid(data) {
     try {

         const {lat, long} = data;
         const url_final = `${process.env.URL_MAPQUEST}/findlinkid?key=${process.env.KEY}&lat=${lat}&lng=${long}`;
         let streetName = ''
                
         await axios.get(url_final)
         .then(function (response) {
          //escrever em uma arquivo todos os linkIds que cadastrar 
          fs.appendFile('database/linkIds.txt',`,${response.data.linkId}`,(error)=>{
           if(error){
            console.error(error)
           }
          });
          streetName = response.data.street
         })
         .catch(function (error) {
           throw({code:http.BAD_REQUEST, message: error })
         })
         .finally(function () {
          // always executed
         });  

         return { code: http.OK, street: { street: streetName} };

     } catch (error) {
         throw { code: error.code || http.INTERNAL_ERROR, message: error.message };
     }
 }
}

module.exports = new MapQuestService();