import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('notes_management', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

sequelize.sync({ alter: true });

export default sequelize