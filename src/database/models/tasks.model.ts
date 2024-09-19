import { DataTypes, Model } from 'sequelize'
import sequelize from '../connection'
import User from './users.model'

class Task extends Model{}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize
});

Task.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
})

export default Task;