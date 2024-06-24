import { useEffect, useState } from "react";
import { Country } from "../types/Country";
import { State } from "../types/State";
import { City } from "../types/City";
import { addressService } from "../Services/AddressService";
import { notify } from "../Utils/Notify";

export const useAddressData = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [states, setStates] = useState<State[] | null>(null);
  const [cities, setCities] = useState<City[] | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(null);

  useEffect(() => {
    addressService
      .getCountries()
      .then((countries) => setCountries(countries))
      .catch((err: any) => notify.error(err));
  }, []);

  const getStatesByCountry = async (countryName: string) => {
    try {
      const states = await addressService.getStatesByCountryName(countryName);
      setStates(states);
    } catch (err: any) {
      notify.error(err);
    }
  };

  const getCitiesByState = async (stateName: string) => {
    try {
      const cities = await addressService.getCitiesByStateName(stateName);
      !cities.length
        ? setCities([{ city_name: stateName }])
        : setCities(cities);
    } catch (err: any) {
      notify.error(err);
    }
  };

  return {
    countries,
    states,
    cities,
    getStatesByCountry,
    getCitiesByState,
  };
};
