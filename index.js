const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const Order = require('./Order')(sequelize);

// Relacionamentos
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });

module.exports = { sequelize, User, Product, Order };

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);
 