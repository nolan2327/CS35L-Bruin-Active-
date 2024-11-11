from selenium import webdriver
from selenium.webdriver.common.by import By
import json


def fetch_data():
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
                "place_name": text_lines[0],          # First line: Place name
                "status": text_lines[1],              # Second line: Status
                "last_count": text_lines[2].split(": ")[1],  # Third line: Last count
                "updated_time": text_lines[3].split(": ")[1], # Fourth line: Updated time
                "percentage": text_lines[4]           # Fifth line: Percentage
            }
            data_list.append(place_data)

    driver.quit()
    return json.dumps(data_list)

fetch_data()