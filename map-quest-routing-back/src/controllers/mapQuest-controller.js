const mapQuestService = require('../services/mapQuest-service');

class MapQuestController {

    static createRoute(req, res) {
        return mapQuestService.traceRoute(req.params)
            .then(result => {
                res.status(result.code).json(result.route);
            }).catch(error => res.status(error.code).json(error.message));
    }

    static addMustAvoid(req, res) {
     return mapQuestService.addInMustAvoid(req.body)
         .then(result => {
             res.status(result.code).json(result.street);
         }).catch(error => res.status(error.code).json(error.message));
 }

}

module.exports = MapQuestController;