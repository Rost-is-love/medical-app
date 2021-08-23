/* eslint-disable functional/no-class */
/* eslint-disable functional/no-let */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { Patient, Name, Address } from '../models/models.js';
import ApiError from '../error/ApiError.js';

const createPatient = async (req, res, next) => {
  try {
    const { patientName, gender, birthDate, patientAddress, chiNumber } = req.body;
    const [lastName, firstName, patronymic] = patientName;
    const [city, line] = patientAddress;

    const hasPatient = await Patient.findOne({
      where: { chi_number: chiNumber },
    });

    if (hasPatient) {
      return next(ApiError.badRequest('Patient already exists', true));
    }

    const patient = await Patient.create({
      gender,
      birth_date: birthDate,
      chi_number: chiNumber,
    });

    const name = await Name.create({
      first_name: firstName,
      last_name: lastName,
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
    const { id } = req.query;

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
    const { id, patientName, gender, birthDate, patientAddress, chiNumber } = req.body;
    const [lastName, firstName, patronymic] = patientName;
    const [city, line] = patientAddress;

    const patient = await Patient.findOne({
      where: { id },
    });

    const newPatient = await Patient.update(
      {
        gender,
        birth_date: birthDate,
        chi_number: chiNumber,
      },
      { returning: true, where: { id } },
    );

    const newName = await Name.update(
      {
        first_name: firstName,
        last_name: lastName,
        patronymic,
      },
      { returning: true, where: { patientId: patient.id } },
    );

    const newAddress = await Address.update(
      {
        city,
        line,
      },
      { returning: true, where: { patientId: patient.id } },
    );

    Promise.all([newPatient, newName, newAddress]).then((response) => res.json(response));
  } catch (error) {
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
