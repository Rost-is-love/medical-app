const host = '';
const prefix = 'api';

export default {
  patientsPath: () => [host, prefix, 'patients'].join('/'),
  updatePath: () => [host, prefix, 'patients', 'update'].join('/'),
  searchPath: () => [host, prefix, 'patients', 'search'].join('/'),
};
