import React, { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

interface AstronomyPicInterface {
  date: string;
  explanation: string;
  title: string;
  url: string;
}

const PictureFetch = () => {
  const [astronomyPicData, setAstronomyPicData] =
    useState<AstronomyPicInterface>();

  const [fetchError, setFetchError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw Error("Didn't received the data");

      const data = await response.json();
      setAstronomyPicData(data);
      setFetchError(null);
    } catch (err: any) {
      console.log('error: ', err.message);
      setFetchError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='content'>
      {fetchError && (
        <p style={{ color: 'blue' }}>{`Error occured: ${fetchError} `}</p>
      )}
      <div className='header'>
        <h2>{astronomyPicData?.title}</h2>
      </div>
      <div className='image-wrapper'>
        <img src={astronomyPicData?.url} alt={astronomyPicData?.title} />
      </div>
      <p>{astronomyPicData?.date}</p>
      <div className='explanation'>
        <p>{astronomyPicData?.explanation}</p>
      </div>
    </div>
  );
};

export default PictureFetch;
