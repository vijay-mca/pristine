import { environment } from '../environments/environment.prod';

export const API = environment.production
  ? 'http://www.victoryvisions.org/projects/test/API.php'
  : 'http://localhost/pristin/API.php';
