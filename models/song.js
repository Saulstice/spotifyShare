// Song model for spotify DB ------------------------------------------------------------------------------------------------------------------------
module.exports = function (sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        song: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumCover:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {});

    Song.associate = function(models) {
        Song.belongsTo(models.User);
    };
    return Song;
};