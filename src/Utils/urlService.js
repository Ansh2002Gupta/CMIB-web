import qs from "query-string";
import * as _ from "lodash";

class UrlServiceClass {
  getQueryStringValue = (key, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    return values[key];
  };

  setQueryStringWithoutPageReload = (qsValue) => {
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      qsValue;

    window.history.replaceState({ path: newurl }, "", newurl);
  };

  setQueryStringValue = (key, value, queryString = window.location.search) => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    this.setQueryStringWithoutPageReload(`?${newQsValue}`);
  };

  setMultipleQueryStringValues = (
    keyValuePair,
    queryString = window.location.search
  ) => {
    const values = qs.parse(queryString);
    const updatedKeyValuePair = { ...values, ...keyValuePair };
    Object.keys(updatedKeyValuePair).forEach(
      (key) => !updatedKeyValuePair[key] && delete updatedKeyValuePair[key]
    );
    const newQsValue = qs.stringify({ ...updatedKeyValuePair });
    this.setQueryStringWithoutPageReload(`?${newQsValue}`);
  };

  removeParam = (key, sourceURL = window.location.href) => {
    let urlparts = sourceURL.split("?");
    let urlBase = urlparts.shift();
    let queryString = urlparts.join("?");
    let pars = queryString.split(/[&;]/g);
    let prefix = key + "=";
    for (let i = pars.length; i-- > 0; )
      if (pars[i].lastIndexOf(prefix, 0) !== -1) pars.splice(i, 1);

    let url = urlBase + "?" + pars.join("&");
    window.history.replaceState("", document.title, url);
  };

  objectToQueryString = (requestedParams) => {
    let queryString = "";
    const validParams = _.omitBy(
      requestedParams,
      (v) =>
        _.isUndefined(v) ||
        _.isNull(v) ||
        v === "" ||
        (Array.isArray(v) && v.length === 0)
    );
    const keys = Object.keys(validParams);
    for (let key of keys) {
      queryString += `${key}=${validParams[key]}&`;
    }
    return queryString.slice(0, queryString.length - 1);
  };
}

export const urlService = new UrlServiceClass();
