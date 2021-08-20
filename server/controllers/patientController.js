/* eslint-disable class-methods-use-this */
import { Patient, Name, Address } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class PatientController {
  async create(req, res, next) {
    try {
      const { patientName, gender, birthDate, patientAddress, chiNumber } = req.body;
      const [firstName, lastName, patronymic] = patientName;
      const [city, line] = patientAddress;

      const hasPatient = await Patient.findOne({
        where: { chi_number: chiNumber },
      });

      if (hasPatient) {
        return next(ApiError.badRequest('Patient already exists', true));
      }

      let address;
      const hasAddress = await Address.findOne({
        where: { city, line },
      });

      if (hasAddress) {
        address = hasAddress;
      } else {
        address = await Address.create({ city, line });
      }

      const patient = await Patient.create({
        gender,
        birth_date: birthDate,
        chi_number: chiNumber,
        addressId: address.id,
      });

      const name = await Name.create({
        first_name: firstName,
        last_name: lastName,
        patronymic,
        patientId: patient.id,
      });

      return res.json({ patient, address, name });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res) {}

  async edit(req, res) {}

  async getAll(req, res) {}

  async getOne(req, res, next) {}
}

export default new PatientController();
