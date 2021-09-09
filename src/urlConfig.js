const baseUrl = "https://flipkart-restapi-server.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
