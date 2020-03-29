var express = require('express');
var app = express();
var router = express.Router();
var lodash = require('lodash');
var netflixModel = require('./../model/netflixTitles');
var netflixData = require('./../utility/netflixTitlesDB');

router.get('/',function(req,res){
    res.render('index')
});


router.get('/get', function (req, res) {
    console.log("Inside the method in controller");
    netflixData.allNetflixTitles().then(function (result) {
        var netflixResults = result;
        var response = {};
        var netflixInfo = [];

        Object.keys(netflixResults).forEach(function (key) {
            netflixInfo.push(netflixModel.netflixTitles(netflixResults[key]['_id'], netflixResults[key]['type'], netflixResults[key]['title'], netflixResults[key]['release_year'], netflixResults[key]['genere']));
        });

        if (netflixInfo.length > 0) {
            response.status = "success";
            response.data = netflixInfo;
        } else {
            response.status = "success";
            response.data = "No data found";
        }

        res.send(response);

    }).catch(function(err){
        console.log(err);
    })
});



router.post('/', function (req, res) {
    console.log("Inside the create method");
    var netflixReq = netflixModel.netflixTitles("", req.body.type, req.body.title, req.body.release_year, req.body.genere);
    var updateInformation;
    netflixData.createNetflixTitle(netflixReq).then(function (result) {
        updateInformation = result;
        return updateInformation;
    }).then(function (updateInformation) {
        netflixData.allNetflixTitles().then(function (result) {
            var netflixResults = result;
            var response = {};
            var netflixInfo = [];

            Object.keys(netflixResults).forEach(function (key) {
                netflixInfo.push(netflixModel.netflixTitles(netflixResults[key]['_id'], netflixResults[key]['type'], netflixResults[key]['title'], netflixResults[key]['release_year'], netflixResults[key]['genere']));
            });

            if (netflixInfo.length > 0) {
                response.status = "success";
                response.data = netflixInfo;
            } else {
                response.status = "success";
                response.data = "No data found";
            }

            res.send(response);

        });
    });
});



router.put('/:_id', function (req, res) {
    var showId = req.params._id;
    var netflixReq = netflixModel.netflixTitles(req.params._id, req.body.type, req.body.title, req.body.release_year, req.body.genere);
    console.log("netflixReq is", netflixReq);
    var updateInformation;
    netflixData.updateNetlflixTitle(netflixReq).then(function (result) {
        updateInformation = result;
        console.log("Update Information",updateInformation);
        return updateInformation;
    }).then(function (updateInformation) {
        netflixData.allNetflixTitles().then(function (result) {
            var netflixResults = result;
            console.log("netflixResults : ",netflixResults);
            var response = {};
            var info = [];

            Object.keys(netflixResults).forEach(function (key) {
                info.push(netflixModel.netflixTitles(netflixResults[key]['_id'], netflixResults[key]['type'], netflixResults[key]['title'], netflixResults[key]['release_year'], netflixResults[key]['genere']));
            });

            if (info.length > 0) {
                response.status = "success";
                response.data = info;
            } else {
                response.status = "success";
                response.data = "No data found";
            }

            res.send(response);

        });
    });
});

router.patch('/:_id', function (req, res) {
    var netflixReq = netflixModel.netflixTitles(req.params._id, req.body.type);
    var updateInformation;
    console.log("request", netflixReq);
    netflixData.editNetflixTitles(netflixReq).then(function (result) {
        updateInformation = result;
        console.log("Update Information",updateInformation);
        return updateInformation;
    }).then(function (updateInformation) {
        netflixData.allNetflixTitles().then(function (result) {
            var netflixResults = result;
            var response = {};
            var info = [];

            Object.keys(netflixResults).forEach(function (key) {
                info.push(netflixModel.netflixTitles(netflixResults[key]['_id'], netflixResults[key]['type'], netflixResults[key]['title'], netflixResults[key]['release_year'], netflixResults[key]['genere']));
            });

            if (info.length > 0) {
                response.status = "success";
                response.data = info;
            } else {
                response.status = "success";
                response.data = "No data found";
            }

            res.send(response);

        });
    });
});


router.delete('/:_id', function (req, res) {
    var showId = req.params._id;
    var deleteNetflix;
    netflixData.deleteNetflix(showId).then(function (result) {
        deleteNetflix = result;
        return deleteNetflix;
    }).then(function (updateInformation) {
        netflixData.allNetflixTitles().then(function (deleteResult) {
            var netflixResults = deleteResult;
            var response = {};
            var info = [];

            Object.keys(netflixResults).forEach(function (key) {
                info.push(netflixModel.netflixTitles(netflixResults[key]['_id'], netflixResults[key]['type'], netflixResults[key]['title'], netflixResults[key]['release_year'], netflixResults[key]['genere']));
            });

            if (netflixResults.length > 0) {
                response.status = "success";
                response.data = info;
            } else {
                response.status = "success";
                response.data = "No data found";
            }

            res.send(response);

        });
    });
});




module.exports = router;