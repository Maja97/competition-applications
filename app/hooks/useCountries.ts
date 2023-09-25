'use client';
import { axiosInstance } from '@app/service/service';
import { Country } from '@app/types/country';
import { useEffect, useState } from 'react';

const useCountries = () => {
  const [data, setData] = useState<Country[] | null>(null);

  const fetchData = async () => {
    try {
      await axiosInstance
        .get<Country[]>('countries')
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { countries: data };
};

export default useCountries;
