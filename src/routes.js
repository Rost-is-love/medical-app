const host = '';
const prefix = 'api';

export default {
  patientssPath: () => [host, prefix, 'patients'].join('/'),
};
