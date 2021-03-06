import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //Get a list of all companies
  static async getCompanies(name) {
    let res = await this.request(`companies`, { name });
    return res.companies;
  }

  //Get a list of all jobs
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  //Login
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res;
  }

  //Signup
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");

    return res;
  }

  //Get user profile
  static async getUserInfo(username) {
    let res = await this.request(`users/${username}`);

    return res.user;
  }

  //Edit user profile
  static async editProfile(username, formData) {
    let res = await this.request(`users/${username}`, formData, "patch");

    return res.user;
  }

  //Apply for a job.

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

}


export default JoblyApi;