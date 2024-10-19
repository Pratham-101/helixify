import requests


def get_factors(city):

    api_key = "9bcfbc335c2884c216b21da1ed747fd1"
    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

    response = requests.get(weather_url)
    weather_data = response.json()

    print(weather_data)

    if response.status_code == 401:
        print(f"Error: Invalid API key. Please check your API key.")
        return 0, 0, 0
    
    elif response.status_code == 404:
        print(f"City not found: {weather_data.get('message')}")
        return 0, 0, 0

    else:
        temperature = weather_data['main']['temp']
        humidity = weather_data['main']['humidity']
        lat = weather_data['coord']['lat']
        lon = weather_data['coord']['lon']

        pollution_url = f"http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={api_key}"

        pollution_response = requests.get(pollution_url)
        pollution_data = pollution_response.json()

        aqi = pollution_data['list'][0]['main']['aqi']

        if temperature == None or humidity == None or aqi == None:
            return 0, 0, 0

        return temperature, humidity, aqi
    