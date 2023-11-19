import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios, { AxiosResponse } from "axios";
import { Photo } from "../../types"
const CLIENT_ID = 'wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw';

function UserPhotos() {
  const { userId } = useParams();
  const [loadingState, setLoadingState] = useState<string>("loading")
  const [photosList, setPhotosList] = useState<Photo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(`https://api.unsplash.com/users/${userId}/photos/?client_id=${CLIENT_ID}`);
        // Handle successful response here
        setLoadingState('loaded');
        setPhotosList(response.data);

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
      {loadingState === 'loading' ? <p>Loading...</p> :
      <div>
        <h1 className="UserPhotos-heading">
          <Link to={"/"}>&#8592;</Link>
          Photos of {userId}
        </h1>
        <ul className="photo-list">
          {photosList.map((photo) => {
            return <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.description}/>
              <span></span>
            </li>
          })}
        </ul>
      </div>}
      {loadingState === 'error' ? <p>An Error Occured!</p> : null}
    </>
  )
}

export default UserPhotos;