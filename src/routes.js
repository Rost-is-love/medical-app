const host = '';
const prefix = 'api';

export default {
  patientsPath: () => [host, prefix, 'patients'].join('/'),
};
