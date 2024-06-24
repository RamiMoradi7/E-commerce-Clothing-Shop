import axios from "axios";
import { Country } from "../types/Country";
import { State } from "../types/State";
import { City } from "../types/City";

class AddressService {
  private readonly EMAIL = "ramimoradilg4@gmail.com";
  public readonly API_KEY =
    "biyuTwpteVOTg7sYlMjNvOeLLDUmgTGtUauXDFgsUuDmgUA0-4ppMyT3wRoDH9fQ5WM";

  public async getAccessToken(): Promise<string> {
    try {
      const response = await axios.get(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            Accept: "application/json",
            "api-token": this.API_KEY,
            "user-email": this.EMAIL,
          },
        }
      );
      console.log(response.data.auth_token);
      return response.data.auth_token;
    } catch (err: any) {
      console.error("Error fetching token:", err);
    }
  }

  public async getCountries(): Promise<Country[]> {
    const authToken = await this.getAccessToken();
    const response = await axios.get<Country[]>(
      "https://www.universal-tutorial.com/api/countries/",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );
    const countries = response.data;
    return countries;
  }
  public async getStatesByCountryName(countryName: string): Promise<State[]> {
    const authToken = await this.getAccessToken();
    const response = await axios.get<State[]>(
      `     https://www.universal-tutorial.com/api/states/${countryName}
`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );
    const states = response.data;
    return states;
  }
  public async getCitiesByStateName(stateName: string): Promise<City[]> {
    const authToken = await this.getAccessToken();
    const response = await axios.get<City[]>(
      `      https://www.universal-tutorial.com/api/cities/${stateName}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      }
    );
    const cities = response.data;
    return cities;
  }
}
export const addressService = new AddressService();
