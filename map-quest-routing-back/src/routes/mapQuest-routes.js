const mapQuestCtrl = require('../controllers/mapQuest-controller');

module.exports = (router) => {

    router.get('/traceroute/:from/:to', mapQuestCtrl.createRoute);
    router.post('/mustAvoid', mapQuestCtrl.addMustAvoid);

 };