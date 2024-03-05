import axios from 'axios';

export const fetchPrayerTimes = async (setPrayerTimes) => {
  const today = new Date();
  const date = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();

  try {
    const response = await axios.get(`https://api.aladhan.com/v1/timings/${date}-${month}-${year}`, {
      params: {
        latitude: 51.0447,
        longitude: -114.0719,
        method: 2
      },
    });

    const timings = response.data.data.timings;
    const times = [
        { name: 'Fajr', time: timings.Fajr, details: '2 Sunnah, 2 Farz' },
        { name: 'Dhuhr', time: timings.Dhuhr, details: '4 Sunnah, 4 Farz, 2 Sunnah' },
        { name: 'Asr', time: timings.Asr, details: '4 Farz' },
        { name: 'Maghrib', time: timings.Maghrib, details: '3 Farz, 2 Sunnah' },
        { name: 'Isha', time: timings.Isha, details: '4 Farz, 2 Sunnah, 3 Witr' },
    ];

    setPrayerTimes(times);
  } catch (error) {
    console.error('Could not fetch prayer times:', error);
  }
};



//OLD FUNCTION THAT WAS DIRECTLY PUT IN THE APP.JS
// useEffect(() => {
  //   const fetchPrayerTimes = async () => {
  //     const today = new Date();
  //     const date = today.getDate().toString().padStart(2, '0');
  //     const month = (today.getMonth() + 1).toString().padStart(2, '0');
  //     const year = today.getFullYear();

  //     try {
  //       // We use axios to make a GET request to the API with the correct parameters.
  //       const response = await axios.get(`https://api.aladhan.com/v1/timings/${date}-${month}-${year}`, {
  //         params: {
  //           latitude: 51.0447, // Latitude for Calgary
  //           longitude: -114.0719, // Longitude for Calgary
  //           method: 2 // ISNA method for prayer time calculation
  //         },
  //       });

  //       // Once we get the response, we extract the timings data.
  //       const timings = response.data.data.timings;

  //       // We then map the timings data to an array with additional details for each prayer.
  //       const times = [
  //         { name: 'Fajr', time: timings.Fajr, details: '2 Sunnah, 2 Farz' },
  //         { name: 'Dhuhr', time: timings.Dhuhr, details: '4 Sunnah, 4 Farz, 2 Sunnah' },
  //         { name: 'Asr', time: timings.Asr, details: '4 Farz' },
  //         { name: 'Maghrib', time: timings.Maghrib, details: '3 Farz, 2 Sunnah' },
  //         { name: 'Isha', time: timings.Isha, details: '4 Farz, 2 Sunnah, 3 Witr' },
  //         // Add or remove any prayers as needed
  //       ];

  //       // Finally, we update the prayerTimes state with the new array.
  //       setPrayerTimes(times);
  //     } catch (error) {
  //       // If there is an error in the API call, we log it to the console.
  //       console.error('Could not fetch prayer times:', error);
  //     }
  //   };

  //   // We call the fetchPrayerTimes function to execute the API call.
  //   fetchPrayerTimes();
  // }, []);