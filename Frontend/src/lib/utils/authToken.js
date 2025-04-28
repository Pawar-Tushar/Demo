export const getAccessToken = () => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "__accessToken") {
         console.log(decodeURIComponent(value))
        return decodeURIComponent(value);
      }
      // if (localStorage.getItem("accessToken")) {
      //   console.log("found in localStorage")
      //   return localStorage.getItem("accessToken");
      // }
    }
    return null;
  };