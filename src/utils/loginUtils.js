export const fetchToken = () => {
  return localStorage.getItem("token");
};

export const fetchUserId = () => {
  return localStorage.getItem("userId");
};
