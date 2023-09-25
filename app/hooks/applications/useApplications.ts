'use client';
import { axiosInstance } from '@app/service/service';
import { Application } from '@app/types/application';
import { useEffect, useState } from 'react';

const useApplications = () => {
  const [data, setData] = useState<Application[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await axiosInstance
        .get<Application[]>('applications')
        .then((res) => {
          setLoading(false);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};

export default useApplications;
