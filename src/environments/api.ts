import { environment } from '../environments/environment.prod';
export const AUTH_USERNAME = 'PristineCompetitions';
export const AUTH_PASSWORD = '7b5fafa1c12072826389e59f2519dfd0';
export const REQUEST_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
};
export const API = environment.production
  ? 'https://www.pristinecompetitions.com/demo/API/api-test.php'
  : 'http://localhost/pristin/API.php';

const mode: string = 'test';

export const CHECKOUT =
  mode === 'live'
    ? 'https://www.pristinecompetitions.com/app-redirect.php'
    : 'https://www.pristinecompetitions.com/demo/app-redirect.php';
