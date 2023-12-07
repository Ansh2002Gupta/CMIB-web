function formatKey(name) {
  return `react_app_${name}`;
}

class Storage {
  //localStoraage
  static set(key, value) {
    if (!value) return;
    return localStorage.setItem(formatKey(key), value);
  }

  static get(key) {
    if (!key) return;
    const item = localStorage.getItem(formatKey(key));
    if (!item) return;
    return item;
  }

  static remove(key) {
    if (!key) return;
    return localStorage.removeItem(formatKey(key));
  }

  static removeAll() {
    return localStorage.clear();
  }

  //sessionStoraage
  static sset(key, value) {
    if (!value) return;
    return sessionStorage.setItem(formatKey(key), JSON.stringify(value));
  }

  static sget(key) {
    if (!key) return;
    const item = sessionStorage.getItem(formatKey(key));
    if (!item) return;
    return JSON.parse(item);
  }

  static sremove(key) {
    if (!key) return;
    return sessionStorage.removeItem(formatKey(key));
  }

  static sremoveAll() {
    return sessionStorage.clear();
  }
}

export default Storage;
