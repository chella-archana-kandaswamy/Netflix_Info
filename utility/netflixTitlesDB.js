var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var netflixTitlesSchema = new Schema({
    _id: {
        type: String
    },
    type: {
        type: String
    },
    title: {
        type: String
    },
    release_year: {
        type: String
    },
    genere: {
        type: String
    }
}, {
    collection: 'netflixTitles'
});

var netflixTitlesModel = mongoose.model('netflixTitlesModel', netflixTitlesSchema);

//Retrieves all the records
var allNetflixTitles = async function getAllNetflixTitles() {
    var data = {};
    console.log("Inside allNetflixTitles");
    await netflixTitlesModel.find({}, function (err, netflixData) {
        console.log("Inside await");
        if (err)
            console.log("error", err);
        if (netflixData.length > 0) {
            data = netflixData;
        }
    });
    console.log("Netflix data in the database", data);
    return data;
}

//create a new netflix show/movie
var createNetflixTitle = async function createNetflixTitle(netflixTitles) {
    var id = Math.floor(Math.random() * 10) + 80000000;
    new netflixTitlesModel({
        _id: id,
        type: netflixTitles.type,
        title: netflixTitles.title,
        release_year: netflixTitles.release_year,
        genere: netflixTitles.genere
    }).save();
    return true;
}

var updateNetlflixTitle = async function updateNetlflixTitle(netflix) {
    console.log("id is", netflix._id)
    var netflixList = {};
    await netflixTitlesModel.findOneAndUpdate({
        _id: netflix._id
    }, {
        $set: {
            type: netflix.type,
            title: netflix.title,
            release_year: netflix.release_year,
            genere: netflix.genere
        }
    }, {
        new: true
    }, function (err, items) {
        netflixList = items;
    });
    return netflixList;
};

var editNetflixTitles = async function editNetflixTitles(netflix) {
    console.log("id is", netflix._id)
    console.log("type", netflix.type);
    var netflixList = {};
    await netflixTitlesModel.findByIdAndUpdate({
        _id: netflix._id
    }, {
        $set: {
            type: netflix.type
        }
    }, {
        new: true
    }, function (err, items) {
        netflixList = items;
    });
    console.log("Netflixlist", netflixList);
    return netflixList;
};


var deleteNetflix = async function deleteNetflix(showId) {
    await netflixTitlesModel.remove({
        _id: showId
    }, function (err, data) {
        if (err)
            console.log(err);
        console.log('netflix Delete', data);
    });
}


var searchNetflix = async function searchNetflix(showId) {
    var infoData = {};
    console.log("Inside searchNetflix", showId);

    await netflixTitlesModel.findOne({
        _id: showId
    }, function (err, result) {
        console.log("result", result);
        if (err)
            console.log("error", err);
        if (result.length > 0) {
            infoData = result;
        }
    });
    console.log("data in put", infoData);
    return infoData;
}




module.exports.allNetflixTitles = allNetflixTitles;
module.exports.createNetflixTitle = createNetflixTitle;
module.exports.updateNetlflixTitle = updateNetlflixTitle;
module.exports.editNetflixTitles = editNetflixTitles;
module.exports.searchNetflix = searchNetflix;
module.exports.deleteNetflix = deleteNetflix;