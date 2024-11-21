from selenium import webdriver
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
import certifi
import re
import os
import time

url = "https://recreation.ucla.edu/events"

driver = webdriver.Chrome()
driver.get(url)

events_element = driver.find_elements(By.CLASS_NAME, 'event-cards-home')[0]

all_links = events_element.find_elements(By.TAG_NAME, 'a')

events = []

for link in all_links:
    if 'community.ucla.edu' in link.get_attribute('href'):
        events.append(link.get_attribute('href'))

data_list = []

for event in events:
    driver.get(event)

    title = driver.find_elements(By.TAG_NAME, 'h1')[0].text

    date = driver.find_elements(By.CLASS_NAME, 'event-time.event-time-loaded')[0].text
    current_year = datetime.now().year
    if 'Time' in date:
        date = date[5:len(date)-3]
        date_part, time_part = date.split('•')
        date_part = date_part.strip()
        time_part = time_part.strip() 

        start_time, end_time = time_part.split('-')
        start_time = start_time.strip()
        end_time = end_time.strip()

        start_date = date_part + " " + start_time
        end_date = date_part + " " + end_time
    else:
        date = date[4:]
        start_date, end_date = date.split('-')
        start_date = start_date.strip()
        end_date = end_date.strip()

    location_elements = driver.find_elements(By.CLASS_NAME, 'event-location')

    location = "" 

    for element in location_elements:
        location = element.text 

    if not location_elements:  
        location = ""

    if location == "Zoom":
        all_links = []
        for element in location_elements:
            all_links.extend(element.find_elements(By.TAG_NAME, 'a'))
            location = all_links[0].get_attribute('href')
    
    description = driver.find_elements(By.CLASS_NAME, 'event-description')[0].text

    group = {
        "start_date": start_date,
        "end_date": end_date,
        "title": title,
        "location": location,
        "description": description
    }

    data_list.append(group)

driver.quit()

load_dotenv(dotenv_path='server/.env')
# client = MongoClient(os.getenv('ATLAS_URI'))
client = MongoClient(os.getenv('ATLAS_URI'), tlsCAFile=certifi.where())
db = client['Bruin-Active']
collection = db['Calendar']
collection.insert_many(data_list)
client.close()