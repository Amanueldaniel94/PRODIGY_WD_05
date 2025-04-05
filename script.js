
    const apiKey = '13ec3bf0b6badc46c1b0a663db4b3595'; // ← Paste your OpenWeatherMap API key here

    function getWeatherByCity() {
      const city = document.getElementById('cityInput').value.trim();
      if (!city) {
        alert('Please enter a city name.');
        return;
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      fetchWeather(url);
    }

    function getWeatherByLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          fetchWeather(url);
        }, () => {
          alert("Location access denied.");
        });
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    }

    async function fetchWeather(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) {
          document.getElementById("weather").innerHTML = `<p>❌ City not found. Try again.</p>`;
          return;
        }
        displayWeather(data);
      } catch (error) {
        document.getElementById("weather").innerHTML = `<p>⚠️ Failed to fetch weather data.</p>`;
      }
    }

    function displayWeather(data) {
      const weatherDiv = document.getElementById("weather");
      weatherDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>🌤️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
        <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;
    }

