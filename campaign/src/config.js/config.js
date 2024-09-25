const URL = (server) => {
    if (typeof server !== 'string') {
      throw new Error("Server parameter must be a string");
    }


    switch (server) {
      case "PRO":
        // return process.env.PROURL;
        return 'https://fullstack-web2-campaignproject.onrender.com'
      case "DEV":
        // return process.env.DEVURL;
        return 'http://localhost:5000'
      default:
        throw new Error(`Unknown server type: ${server}`);
    }
  }

  export const FURL = URL('DEV');
  console.log("url:", FURL)

  