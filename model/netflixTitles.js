var netflixTitles = function (_id, type, title, release_year, genere) {
    var netflixTitlesModel = {
        _id : _id,
        type : type,
        title : title,
        release_year : release_year,
        genere : genere
    };
    return netflixTitlesModel;
};

module.exports.netflixTitles = netflixTitles;