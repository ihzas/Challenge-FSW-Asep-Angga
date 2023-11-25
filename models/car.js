const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Car = sequelize.define('Car', {
        make: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: DataTypes.STRING,
        deletedBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
    });

    return Car;
};
