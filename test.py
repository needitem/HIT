import requests
import json


url = "https://ba63-104-196-222-254.ngrok-free.app/hello"


try:
    response = requests.get(url)

except requests.exceptions.RequestException as e:
    print(e)
print(response.text)