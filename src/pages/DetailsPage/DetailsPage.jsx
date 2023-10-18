import React, { useEffect, useState, } from 'react';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';



const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');


  const [currentTime, setCurrentTime] = useState(moment());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => prevTime.clone().add(1, 'second'));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);









  useEffect(() => {
    // Fetch user details
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUserDetails(data));

    // Fetch user posts
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(response => response.json())
      .then(data => setUserPosts(data));
  }, [id]);




  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
    try {
      const response = await axios.get(`http://worldtimeapi.org/api/timezone/${country}`);
      const fetchedTime = response.data.datetime;
      const timezone = response.data.timezone;

      const timeMomentObject = moment.tz(fetchedTime, timezone);
      setCurrentTime(timeMomentObject);
    } catch (error) {
      console.error("Error fetching time for country", error);
    }
  };

  useEffect(() => {
    axios.get("http://worldtimeapi.org/api/timezone")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("Error fetching countries", error);
      });
  }, []);


  const handleToggleTime = () => {
    setIsRunning(prev => !prev); // Toggle the current state
  };



  return (
    <>
   <div >
        <div className='container mt-2' >
          <Card className='card' >
            <div className=' card-head d-flex justify-content-between align-items-center flex-column flex-sm-row gap-4' >

              <button className='back-btn' onClick={() => navigate(-1)}>Back</button>

              <div>
                <DropdownButton id="country-dropdown" title={selectedCountry || "Select a Country"}>
                  {countries.map(country => (
                    <Dropdown.Item key={country} onClick={() => handleCountrySelect(country)}>
                      {country}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>


              </div>
              <div className='d-flex justify-content-center align-items-center gap-4' >
                <p className='m-0 timer' >{currentTime?.format('HH:mm:ss')}</p>
                <button onClick={handleToggleTime}>
                  {isRunning ? "Pause" : "Start"}
                </button>
              </div>
            </div>
            <h1 className="mb-5 text-center" >Profile Page</h1>
            <div className='profile-dtl d-flex justify-content-between align-items-center flex-column flex-md-row gap-4' >
              <div>
                <h4>{userDetails.name}</h4>

                <p> {userDetails.username} | {userDetails.website}   </p>
              </div>
              <div>
                <h6>{userDetails?.address?.street}, {userDetails?.address?.suite}, {userDetails?.address?.city}, {userDetails?.address?.zipcode}</h6>
                <p>{userDetails?.email} | {userDetails?.email}</p>
              </div>
            </div>

          </Card>
          <div className='d-flex flex-wrap gap-4 mt-5 justify-content-between align-items-center' >
            <PostCard userPostsList={userPosts} />
          </div>

        </div>


      </div>
    </>
  )
}

export default DetailsPage