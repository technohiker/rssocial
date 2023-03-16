import axios from "axios";
/** Call server endpoints that trigger RSS/API fetches. */

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";  //Update this if needed.

export class ServerCaller{
    static token: string; //Multiple tokens are possible.  This logic may not work.
    static async fetchRSS(){
        
    }
    static async request(endpoint: string, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ServerCaller.token}` };
        const params = method === "get" ? data : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err: any) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];  //Is an array the best means for throwing errors?
        }
      }
}