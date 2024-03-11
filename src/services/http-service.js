import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const dbaseUrl =
  "https://9127-2401-4900-51e0-460d-dcb5-3ec6-f7b8-a3c6.ngrok-free.app/api/";

export default class Http {
  static async get(_url, apiOptions = {}, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);
      const response = await axios.get(url, {
        cancelToken: cancelGetRequest.token,
        ...apiOptions,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async dget(_url, apiOptions = {}, handleDiscard = () => {}) {
    const url = `${dbaseUrl}${_url}`;
    try {
      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);
      const response = await axios.get(url, {
        cancelToken: cancelGetRequest.token,
        ...apiOptions,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async post(_url, data, apiOptions = {}, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);
      const response = await axios.post(url, data, {
        cancelToken: cancelPostRequest.token,
        ...apiOptions,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async put(_url, data) {
    const url = `${baseUrl}${_url}`;
    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async delete(_url) {
    const url = `${baseUrl}${_url}`;
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async patch(_url, data, apiOptions = {}, handleDiscard = () => {}) {
    const url = `${baseUrl}${_url}`;
    try {
      const cancelPatchRequest = axios.CancelToken.source();
      handleDiscard(cancelPatchRequest);
      const response = await axios.patch(url, data, {
        cancelToken: cancelPatchRequest.token,
        ...apiOptions,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
