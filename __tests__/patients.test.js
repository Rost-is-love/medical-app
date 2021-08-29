/* eslint-disable jest/no-done-callback */
/* eslint-disable functional/no-let */
import request from 'supertest';

import getApp from '../server/index.js';

describe('test patients', () => {
  let server;
  // let patientId;

  beforeEach(async () => {
    const app = await getApp();
    server = app.listen();

    /* const res = await request(server).post('/api/patients/').send({
      last_name: 'Antonov',
      first_name: 'Rostislav',
      patronymic: 'Sergeevich',
      gender: 'male',
      birth_date: '1997-03-27',
      city: 'Nekii',
      street: 'Takaya',
      home: '12',
      apartment: '11',
      chi_number: '1111111111111111',
    });

    const { body } = res;
    patientId = body.patient.id; */
  });

  it('should get patients', async () => {
    const res = await request(server).get('/api/patients/');

    expect(res).toHaveHTTPStatus(200);
  });

  /*  it('should not allow creat patient', async () => {
    const res = await request(server).post('/api/patients/').send({
      last_name: 'Antonov',
      first_name: 'Rostislav',
      patronymic: 'Sergeevich',
      gender: 'male',
      birth_date: '1997-03-27',
      city: 'Nekii',
      street: 'Takaya',
      home: '12',
      apartment: '11',
      chi_number: '1111111111111111',
    });

    expect(res).toHaveHTTPStatus(409);
  });

  it('should update patient', async () => {
    const res = await request(server).put('/api/patients/update/').send({
      id: patientId,
      last_name: 'Antonov',
      first_name: 'Rostislav',
      patronymic: 'Sergeevich',
      gender: 'male',
      birth_date: '1997-03-27',
      city: 'Nekii',
      street: 'Takaya',
      home: '12',
      apartment: '11',
      chi_number: '2111111111111111',
    });

    expect(res).toHaveHTTPStatus(200);
  });

  it('should find patient', async () => {
    const res = await request(server).get(
      '/api/patients/search/?body=1111111111111111&type=chiNumber',
    );

    expect(res).toHaveHTTPStatus(200);
  });

  it('should delete patient', async () => {
    const res = await request(server).delete('/api/patients/').send({
      id: patientId,
    });

    expect(res).toHaveHTTPStatus(200);

    const resopnse = await request(server).post('/api/patients/').send({
      last_name: 'Antonov',
      first_name: 'Rostislav',
      patronymic: 'Sergeevich',
      gender: 'male',
      birth_date: '1997-03-27',
      city: 'Nekii',
      street: 'Takaya',
      home: '12',
      apartment: '11',
      chi_number: '1111111111111111',
    });
    expect(resopnse).toHaveHTTPStatus(200);

    const { body } = resopnse;
    patientId = body.patient.id;
  });

  it('should be bad Request', async () => {
    const res = await request(server).post('/api/patients/').send({});

    expect(res).toHaveHTTPStatus(404);
  }); */

  afterEach(async () => {
    /*     await request(server).delete('/api/patients/').send({
      id: patientId,
    }); */

    server.close();
  });
});
