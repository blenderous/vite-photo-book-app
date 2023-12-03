import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import axios, { AxiosResponse } from "axios";
import { Photo } from "../../types";
const CLIENT_ID = 'wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw';

function Home() {

  const [loadingState, setLoadingState] = useState<string>("loading")
  const [photosList, setPhotosList] = useState<Photo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`https://api.unsplash.com/photos/?client_id=${CLIENT_ID}`);
        // Handle successful response here
        setLoadingState('loaded');
        setPhotosList(response.data);

        console.log(photosList);

      } catch (error: unknown) {
        // Handle error here
        if (axios.isAxiosError(error)) {
          // AxiosError has additional properties
          console.error('AxiosError:', error.response?.status, error.response?.data);
          setLoadingState('error');
        } else {
          // Handle non-Axios errors
          console.error('Error:', (error as Error).message);
          setLoadingState('error');
        }
      } finally {
        // This block will be executed regardless of success or failure
        console.log('Request completed, whether it was successful or not.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Photo book</h1>
      {loadingState === 'error' ? <p>An Error Occured!</p> : null}
      {loadingState === 'loading' ? <p>Loading...</p> :
      <div>
        <ul className="photo-list">
          {photosList.map((photo) => {
            return <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description}/>
              <span><Link to={"/vite-photo-book-app/user-photos/" + photo.user.username}>More from {photo.user.username}</Link></span>
            </li>
          })}
        </ul>
      </div>}
    </>
  )
}

export default Home;