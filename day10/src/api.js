import axios from "axios";

const api = axios.create({
  baseURL:
    "https://crudcrud.com/api/89554ddc5940489e93fe815edcd26fd1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (sanitize outgoing data)
api.interceptors.request.use(
  (config) => {
    if (config.data) {
      const sanitizedData = {};

      Object.keys(config.data).forEach((key) => {
        const value = config.data[key];

        sanitizedData[key] =
          typeof value === "string" ? value.trim() : value;
      });

      config.data = sanitizedData;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (sanitize incoming data)
api.interceptors.response.use(
  (response) => {
    if (Array.isArray(response.data)) {
      response.data = response.data.map((item) => ({
        ...item,
        name:
          typeof item.name === "string"
            ? item.name.trim()
            : item.name,
      }));
    } else if (
      response.data &&
      typeof response.data === "object"
    ) {
      response.data = {
        ...response.data,
        name:
          typeof response.data.name === "string"
            ? response.data.name.trim()
            : response.data.name,
      };
    }

    return response;
  },
  (error) => {
    console.error("API Error:", error);

    return Promise.reject(error);
  }
);

export default api;