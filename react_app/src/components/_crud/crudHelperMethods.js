/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import AuthHelperMethods from '../_authentication/authHelperMethods';

const url = 'http://localhost:5000/location';
const Auth = new AuthHelperMethods();
export default class CrudHelperMethods {
  createMarker(lon, lat, comments, name) {
    return Auth.fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        lon,
        lat,
        comments,
        name,
      }),
    });
  }

  readMarker() {
    return Auth.fetch(url, {
      method: 'GET',
    });
  }

  updateMarker(location_id, comments, name) {
    return Auth.fetch(url, {
      method: 'put',
      body: JSON.stringify({
        location_id,
        comments,
        name,
      }),
    });
  }

  deleteMarker(location_id) {
    return Auth.fetch(url, {
      method: 'delete',
      body: JSON.stringify({
        location_id,
      }),
    });
  }
}
