import * as _ from "lodash";
import * as crypto from "crypto-js";

import StorageService from "../../src/services/storage-service.js";

const getDescryptedVal = (val, secretKey) => {
  let decryptObj = crypto.AES.decrypt(val, secretKey);
  return _.attempt(_.invoke, decryptObj, "toString", crypto.enc.Utf8);
};

export const removeItem = (key) => {
  try {
    StorageService.remove(key);
  } catch (err) {
    console.log(err);
  }
};

export const removeAll = () => {
  try {
    StorageService.removeAll();
  } catch (err) {
    console.log(err);
  }
};

export const getItem = (key) => {
  // let retrievedVal = await StorageService.get(key);
  let retrievedVal = StorageService.get(key);

  if (_.isNull(retrievedVal)) {
    return null;
  }
  let decryptedVal = getDescryptedVal(retrievedVal, key);

  if (_.isError(decryptedVal) || _.isEmpty(decryptedVal)) {
    this.removeItem(key);
    return null;
  }
  let decryptedObj = _.attempt(JSON.parse.bind(null, decryptedVal));
  return _.isError(decryptedObj) ? decryptedVal : decryptedObj;
};

export const setItem = (key, val) => {
  let parsedVal;

  // Check whether value is an object
  if (_.isObject(val) || _.isArray(val)) {
    parsedVal = _.attempt(JSON.stringify.bind(null, val));
  }
  // If value is string
  else if (_.isString(val)) {
    parsedVal = val;
  }
  // Encrypt key and store in Storage
  if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
    parsedVal = crypto.AES.encrypt(parsedVal, key);
    StorageService.set(key, parsedVal);
  }
};
