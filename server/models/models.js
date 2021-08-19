import sequelizePkg from 'sequelize';
import sequelize from '../db.js';

const { DataTypes } = sequelizePkg;

const Patient = sequelize.define('patient', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gender: { type: DataTypes.STRING, allowNull: false },
  birth_date: { type: DataTypes.DATEONLY, allowNull: false },
  chi_number: { type: DataTypes.INTEGER, unique: true, allowNull: false },
});

const Name = sequelize.define('name', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  patronymic: { type: DataTypes.STRING, allowNull: true },
});

const Address = sequelize.define('address', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  city: { type: DataTypes.STRING, allowNull: false },
  line: { type: DataTypes.STRING, allowNull: false },
});

Patient.hasOne(Name);
Name.belongsTo(Patient);

Address.hasMany(Patient);
Patient.belongsTo(Address);

export default { Patient, Name, Address };
