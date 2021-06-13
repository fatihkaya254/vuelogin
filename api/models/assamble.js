import Sequelize from 'sequelize'
import sequelize from '../sqlDatabase'

const Assamble = sequelize.define('assamble', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
})

export default Assamble