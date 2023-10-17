import { useState } from 'react';
import './App.css';
import searchIcon from './Assets/search.png'
// import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // Initialize data state with an empty array
  const currencies = []
const handleSearch = async () => {
  try {
    const country = document.getElementsByClassName('country-input')[0].value;
    if (!country) {
      // Handle the case where the input is empty or not found
      return;
    }

    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!response.ok) {
      // Handle the case where the API request fails (e.g., 404 error)
      console.error('Failed to fetch data from the API');
      return;
    }

    const countryData = await response.json();
    console.log(countryData);

    // Set the data state with the fetched data
    setData(countryData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

data.forEach(country=>{
  const countryName = country.name.common;
  const currencyInfo = country.currencies;
  const currencyCode = Object.keys(currencyInfo)[0]; // Get the currency code
  const currencyName = currencyInfo[currencyCode].name;
  const currencySymbol = currencyInfo[currencyCode].symbol;

  currencies.push({
    country: countryName,
    code: currencyCode,
    name: currencyName,
    symbol: currencySymbol,
  });
})
console.log(data)
console.log(currencies)


  return (
    <div className="App">
     <div className="container-fluid w-[100vw] h-[100vh] flex justify-center items-center
     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="content-box w-2/5 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 rounded-lg border border-gray-300 flex flex-col justify-center items-center">
        <div className="searchbox w-[400px] h-[65px] flex gap-1 bg-white rounded-3xl p-2">
          <input type="text" name="" id="" placeholder='Search for your Country...' className='country-input outline-none h-full font-sans text-2xl w-full' />
          <img src={searchIcon} onClick={handleSearch} alt="" className='cursor-pointer border-l-2 p-1 ml-1' />
        </div>
        <div className="logo-section w-1/3 h-2/5 flex flex-col justify-center items-center m-2"> 
          <div className='logo w-[150px] h-[150px] border border-black rounded-full relative overflow-hidden '>
          <img src={data[0]?.flags.png} 
          alt="" srcset="" className='object-cover object-[center_center] w-[100%] h-[100%] rounded-full' />
          </div>
          <h2 className='font-medium text-4xl text-center'>{data[0]?.name?.official}</h2>
        </div>
        <div className="info-setion w-3/4 h-full flex flex-col justify-around text-lg mt-1 font-medium border-t-2">

            <div>Common name: {data[0]?.name.common}</div>
            <div>Official Name: {data[0]?.name.official}</div>
            {/* <div>Native Name: {data[0]?.name.nativeName.eng.official}</div> */}
            <div>Capital: {data[0]?.capital}</div>
            <div>Currency: {`${currencies[0]?.code},${currencies[0]?.symbol},${currencies[0]?.name}`}</div>
            {/* <div>Language(s) Spoken:{data[0]?.languages}</div> */}
            <div>Lat: {data[0]?.latlng[0]} Long: {data[0]?.latlng[1]} </div>
            <div>Area: {data[0]?.area}sq.km</div> 
            <div>Population: {data[0]?.population} </div>
            <div>Location on Google Map: <a href={data[0]?.maps.googleMaps}>Open on map</a>  </div>
            {/* <div>Member of United Nations: {data[0]?.translation.unMember} </div> */}
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
