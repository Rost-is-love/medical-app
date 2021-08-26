/* eslint-disable camelcase */
/* eslint-disable functional/no-class */
/* eslint-disable functional/no-let */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { Patient, Name, Address } from '../models/models.js';
import ApiError from '../error/ApiError.js';

const buildLine = (street, home, apartment) =>
  `ул. ${street}, д. ${home}${apartment ? ', кв.' : ''} ${apartment}`;

const createPatient = async (req, res, next) => {
  try {
    const {
      last_name,
      first_name,
      patronymic,
      gender,
      birth_date,
      city,
      street,
      home,
      apartment,
      chi_number,
    } = req.body;

    const line = buildLine(street, home, apartment);

    const hasPatient = await Patient.findOne({
      where: { chi_number },
    });

    if (hasPatient) {
      next(ApiError.conflictRequest('Patient already exists'));
      return;
    }

    const patient = await Patient.create({
      gender,
      birth_date,
      chi_number,
    });

    const name = await Name.create({
      first_name,
      last_name,
      patronymic,
      patientId: patient.id,
    });

    const address = await Address.create({
      city,
      line,
      patientId: patient.id,
    });

    return res.json({ patient, address, name });
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const patient = await Patient.findOne({
      where: { id },
    });

    const response = await patient.destroy();

    return res.json(response);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const {
      id,
      last_name,
      first_name,
      patronymic,
      gender,
      birth_date,
      city,
      street,
      home,
      apartment,
      chi_number,
    } = req.body;

    const line = buildLine(street, home, apartment);

    const patient = await Patient.findOne({
      where: { id },
    });

    const patientWithChi = await Patient.findOne({
      where: { chi_number },
    });

    if (patientWithChi && patientWithChi.id !== id) {
      next(ApiError.conflictRequest('Patient already exists'));
      return;
    }

    const newPatient = await Patient.update(
      {
        gender,
        birth_date,
        chi_number,
      },
      { returning: true, where: { id } },
    );

    const newName = await Name.update(
      {
        first_name,
        last_name,
        patronymic,
        patientId: patient.id,
      },
      { returning: true, where: { patientId: patient.id } },
    );

    const newAddress = await Address.update(
      {
        city,
        line,
        patientId: patient.id,
      },
      { returning: true, where: { patientId: patient.id } },
    );

    Promise.all([newPatient, newName, newAddress]).then((response) => res.json(response));
  } catch (error) {
    console.log(error, 'sdfsdfssdfsdf');
    next(ApiError.badRequest(error.message));
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 29;
    const offset = page * limit - limit;

    const patients = await Patient.findAndCountAll({
      order: [[Name, 'last_name', 'ASC']],
      include: [
        { model: Name, as: 'name' },
        { model: Address, as: 'address' },
      ],
      limit,
      offset,
    });

    return res.json(patients);
  } catch (error) {
    next(ApiError.badRequest(error.message));
  }
};

export { createPatient, deletePatient, updatePatient, getAllPatients };
