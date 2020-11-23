// Song model for spotify DB ------------------------------------------------------------------------------------------------------------------------
module.exports = function (sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {});

    Song.associate = function(models) {
        Song.belongsTo(models.User);
    };
    return Song;
};