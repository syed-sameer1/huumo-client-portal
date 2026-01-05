import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { LocationSelectParams } from './types';

type Option = { value: string; label: string };

export const useLocationSelects = ({
  control,
  setValue,
}: LocationSelectParams) => {
  const country = useWatch({ control, name: 'country' });
  const state = useWatch({ control, name: 'state' });

  const [countries, setCountries] = useState<Option[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [allCountriesData, setAllCountriesData] = useState<any[]>([]); // store country + states

  // Fetch all countries + states once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://countriesnow.space/api/v0.1/countries/positions/range',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'long',
              min: 1,
              max: 1000,
            }),
          },
        );
        const data = await res.json();

        setAllCountriesData(data.data);

        const mappedCountries = data.data.map((c: any) => ({
          value: c.name,
          label: c.name,
        }));

        setCountries(mappedCountries);
      } catch (err) {
        console.error('Error loading countries', err);
      }
    };

    fetchCountries();
  }, []);

  // fetch states when country changes
  useEffect(() => {
    if (!country) return;

    setStates([]);
    setCities([]);
    setValue('state', '');
    setValue('city', '');
    console.log({ country });

    const fetchStates = async () => {
      try {
        const res = await fetch(
          'https://countriesnow.space/api/v0.1/countries/states',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country }),
          },
        );
        const data = await res.json();
        const mappedStates = data.data.states.map((c: any) => ({
          value: c.state_code,
          label: c.name,
        }));
        setStates(mappedStates);
      } catch (err) {
        console.error('Error loading cities', err);
      }
    };
    fetchStates();
  }, [country, allCountriesData, setValue]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!country || !state) return;

    setCities([]);
    setValue('city', '');

    const fetchCities = async () => {
      try {
        const res = await fetch(
          'https://countriesnow.space/api/v0.1/countries/cities',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country, state }),
          },
        );
        const data = await res.json();
        const mappedCities = data.data.map((c: string) => ({
          value: c,
          label: c,
        }));
        setCities(mappedCities);
      } catch (err) {
        console.error('Error loading cities', err);
      }
    };

    fetchCities();
  }, [country, state, setValue]);

  return {
    countries,
    states,
    cities,
    isStateDisabled: !country,
    isCityDisabled: !state,
  };
};
