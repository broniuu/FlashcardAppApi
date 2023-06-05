import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import AppUserDAO from '../DAO/appUserDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';

function create(context) {

  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    const appUser = await AppUserDAO.getByEmailOrName(name);
    if (!appUser) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    let userData = await appUser;
    await PasswordDAO.authorize(appUser.id, hashString(password));
    const token = await TokenDAO.create(userData);
    return getToken(token);
  }

  function getToken(token) {
    return {token: token.value};
  }

  async function createNewOrUpdate(userData) {
    const user = await AppUserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({userId: user.id, password: hashString(userData.password)});
    } else {
      return user;
    }
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export default {
  create: create
};
