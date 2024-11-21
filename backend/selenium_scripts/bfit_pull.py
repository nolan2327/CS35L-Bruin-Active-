from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi
import re
import os

url = "https://recreation.ucla.edu/facilities/bfit"

driver = webdriver.Chrome()
driver.get(url)

frame = driver.find_elements(By.TAG_NAME, "iframe")[0]
driver.switch_to.frame(frame)
bars = driver.find_elements(By.CLASS_NAME, "barChart")

data_list = []

for bar in bars:
    text_lines = bar.text.split('\n')
    if len(text_lines) >= 5:
        place_data = {
            "place_name": text_lines[0].strip(),
            "status": text_lines[1].strip(),
            "last_count": text_lines[2].split(": ")[1].strip(),
            "updated_time": text_lines[3].split(": ")[1].strip(),
            "percentage": text_lines[4].strip()
        }
        data_list.append(place_data)


driver.switch_to.default_content()

time_pattern = r'\b\d{1,2}:\d{2}\s?[AP]M\b\s?-\s?\d{1,2}:\d{2}\s?[AP]M\b'
regular_hours_element = driver.find_elements(By.CLASS_NAME, "callout")[0]
regular_hours_lines = regular_hours_element.text.split('\n')[1:5]

times = [re.search(time_pattern, hour).group() for hour in regular_hours_lines]
regular_hours_data = {
    "mondayToThursday": times[0],
    "friday": times[1],
    "saturday": times[2],
    "sunday": times[3]
}
data_list.append(regular_hours_data)

special_hours_element = driver.find_elements(By.CLASS_NAME, "column.column-2")[0]
special_hours_lines = special_hours_element.text.split('\n')
special_hours = special_hours_lines[7:11]
finals_date = special_hours_lines[11]
finals_hours = special_hours_lines[12:16]

date_pattern = r'^([\d/]+(?:-[\d/]+)?),?\s+([\w-]+)'
dates_and_weekdays_special = [
    f"{match.group(1)}, {match.group(2)}"
    for line in special_hours if (match := re.search(date_pattern, line))
]

times_special = [
    (match.group() if (match := re.search(time_pattern, hour)) else "Closed")
    for hour in special_hours
]
special_hours_data = dict(zip(dates_and_weekdays_special, times_special))
data_list.append(special_hours_data)

days_pattern = r'^[A-Za-z]+(?:\s*-\s*[A-Za-z]+)?'
days_finals = [
    re.match(days_pattern, line).group()
    for line in finals_hours if re.match(days_pattern, line)
]

times_finals = [
    (match.group() if (match := re.search(time_pattern, hour)) else "Closed")
    for hour in finals_hours
]
finals_week_data = dict(zip(days_finals, times_finals))

data_list.append({"finals_week_date": finals_date})
data_list.append(finals_week_data)

driver.quit()

print(data_list)

load_dotenv(dotenv_path='server/.env')
# client = MongoClient(os.getenv('ATLAS_URI'))
client = MongoClient(os.getenv('ATLAS_URI'), tlsCAFile=certifi.where())
db = client['Bruin-Active']
collection = db['BFit']
collection.insert_many(data_list)
client.close()