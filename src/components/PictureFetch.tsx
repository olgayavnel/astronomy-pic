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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      (async () => await fetchData())();
    }, 2000);
  }, []);

  const handleClick = async () => {
    console.log('we are here');
    await fetchData();
  };

  return (
    <>
      {fetchError && <h2>{`Error occured: ${fetchError} `}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {!fetchError && !isLoading && (
        <>
          <div className='content'>
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
          <button type='button' className='button' onClick={handleClick}>
            Show New Image
          </button>
        </>
      )}
    </>
  );
};

export default PictureFetch;
