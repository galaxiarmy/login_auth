export const coreService = {
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
  getItem: (key) => {
    return localStorage.getItem(key);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
  setObjectItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getObjectItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

export const logout = () => {
  coreService.removeItem("isLoggedIn");
  coreService.removeItem("accessToken");
};
