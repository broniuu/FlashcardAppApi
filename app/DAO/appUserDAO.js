
import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
}, {
  collection: 'appUser'
});

userSchema.plugin(uniqueValidator);

const AppUserModel = mongoose.model('user', userSchema);

function createNewOrUpdate(appUser) {
  return Promise.resolve().then(() => {
    if (!appUser.id) {
      return new  AppUserModel(appUser).save().then(result => {
        if (result) {
          return mongoConverter(result);
        }
      });
    } else {
      return AppUserModel.findByIdAndUpdate(appUser.id, _.omit(appUser, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmailOrName(name) {
  const result = await AppUserModel.findOne({ $or: [{ email: name }, { name: name }] });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await AppUserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function removeById(id) {
  return await AppUserModel.findByIdAndRemove(id);
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmailOrName: getByEmailOrName,
  get: get,
  removeById: removeById,
  
  model: AppUserModel
};
