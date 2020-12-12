// Recommended song model for spotify DB ------------------------------------------------------------------------------------------------------------------------
module.exports = function (sequelize, DataTypes) {
    var Rec = sequelize.define("Rec", {
        song: {
            type: DataTypes.STRING,
            allowNull: false
        },
        songId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        albumCover:{
            type: DataTypes.STRING,
            allowNull: true
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Rec.associate = function(models) {
        Rec.belongsTo(models.User);
    };
    return Rec;
};