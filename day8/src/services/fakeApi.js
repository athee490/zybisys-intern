export const fakeLogin = (email, password) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/";

  console.log("Using API:", apiUrl);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.25;

      if (success) {
        const displayName = email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        resolve({
          token: "fake-jwt-token",
          user: {
            name: displayName || "User",
            email,
          },
        });
      } else {
        reject(new Error("Something went wrong. Try again."));
      }
    }, 1500);
  });
};