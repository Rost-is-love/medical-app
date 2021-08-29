/* eslint-disable jest/no-done-callback */
/* eslint-disable functional/no-let */
import request from 'supertest';

import app from '../server/index.js';

describe('test requestapp', () => {
  let server;

  beforeEach(async () => {
    server = app().listen();
  });

  it('should runrequest app', async () => {
    const res = await request(server).get('/');

    expect(res).toHaveHTTPStatus(200);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
