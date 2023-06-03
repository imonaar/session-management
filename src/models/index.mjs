import { Sequelize, DataTypes } from "sequelize";
import dbConfig from '../../db.config.mjs'


const sequelize = new Sequelize('session_db', 'newuser', '1234', {
    dialect: 'mysql',
    dialectOptions: {
        host: "127.0.0.1",
        port: 3306
    }
})

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    }
});

await User.sync();