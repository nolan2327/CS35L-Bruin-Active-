from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
from pymongo import MongoClient
from bs4 import BeautifulSoup
import certifi
import re
import os


url = "https://recreation.ucla.edu/facilities/jwc"

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
            "place_name": text_lines[0].strip(),          # First line: Place name
            "status": text_lines[1].strip(),              # Second line: Status
            "last_count": text_lines[2].split(": ")[1].strip(),  # Third line: Last count
            "updated_time": text_lines[3].split(": ")[1].strip(), # Fourth line: Updated time
            "percentage": text_lines[4].strip()           # Fifth line: Percentage
        }
        data_list.append(place_data)

driver.switch_to.default_content()

time_pattern = r'\b\d{1,2}:\d{2}\s?[AP]M\b\s?-\s?\d{1,2}:\d{2}\s?[AP]M\b'
regular_hours = driver.find_elements(By.CLASS_NAME, "callout")[1]
regular_hours_lines = regular_hours.text.split('\n')[1:5]

times = [re.search(time_pattern, hour).group() for hour in regular_hours_lines]
regular_hours_data = {
    "mondayToThursday": times[0],
    "friday": times[1],
    "saturday": times[2],
    "sunday": times[3]
}
data_list.append(regular_hours_data)


special_hours_element = driver.find_elements(By.CLASS_NAME, "hdetails")[23]
special_hours_html = special_hours_element.get_attribute('outerHTML')
soup = BeautifulSoup(special_hours_html, "html.parser")
visible_text = soup.get_text()

pattern = r"(\d{1,2}/\d{1,2}(?:-\d{1,2}/\d{1,2})?),\s+([\w-]+),\s+([\d:]+\s+(?:AM|PM))\s*-\s*([\d:]+\s+(?:AM|PM))"

matches = re.findall(pattern, visible_text)

dates = []
hours = []
for match in matches:
    date_range = match[0]
    day_expression = match[1]
    start_time = match[2]
    end_time = match[3]
    dates.append(f"{date_range}, {day_expression}")
    hours.append(f"{start_time} - {end_time}")

special_hours_data = dict(zip(dates, hours))
data_list.append(special_hours_data)

driver.quit()

load_dotenv(dotenv_path='server/.env')
# client = MongoClient(os.getenv('ATLAS_URI'))
client = MongoClient(os.getenv('ATLAS_URI'), tlsCAFile=certifi.where())
db = client['Bruin-Active']
collection = db['Wooden']
collection.insert_many(data_list)
client.close()