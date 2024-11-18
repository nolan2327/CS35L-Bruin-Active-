from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import re

def fetch_data(logic):
    url = ""

    # TRUE(1) = John Wooden Center, FALSE(0) = BFit
    if(logic != 1):
        url = "https://recreation.ucla.edu/facilities/bfit"
    else:
        url = "https://recreation.ucla.edu/facilities/jwc"

    # Code for selenium's web scraper (magic)
    driver = webdriver.Chrome()
    driver.get(url)
    frame = driver.find_elements(By.TAG_NAME, "iframe")[0]
    driver.switch_to.frame(frame)
    bars = driver.find_elements(By.CLASS_NAME, "barChart")

    # Return array of data
    data_list = []

    # Collect data in graph
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

    driver.switch_to.default_content()
    time_pattern = r'\b\d{1,2}:\d{2}\s?[AP]M\b\s?-\s?\d{1,2}:\d{2}\s?[AP]M\b'
    date_pattern = r'^([\d/]+(?:-[\d/]+)?),?\s+([\w-]+)'
    days_pattern = r'^[A-Za-z]+(?:\s*-\s*[A-Za-z]+)?'

    # Extract Regular Hours 
    if (logic == 1):        
        regular_hours = driver.find_elements(By.CLASS_NAME, "callout")[1]
    else:
        regular_hours = driver.find_elements(By.CLASS_NAME, "callout")[0]

    regular_hours = regular_hours.text.split('\n')[1:5]
    times = [re.search(time_pattern, hour).group() for hour in regular_hours]
    regular_hours_data = {
        "mondayToThursday": times[0],
        "friday": times[1],
        "saturday": times[2],
        "sunday": times[3]
    }
    data_list.append(regular_hours_data)

    # Extract Special Hours
    if (logic != 1):
        special_hours_element = driver.find_elements(By.CLASS_NAME, "column.column-2")[0]
        special_hours_lines = special_hours_element.text.split('\n')
        special_hours = special_hours_lines[7:11]
        finals_date = special_hours_lines[11]
        finals_hours = special_hours_lines[12:16]

        times_special = [
            (match.group() if (match := re.search(time_pattern, hour)) else "Closed")
            for hour in special_hours
        ]

        dates_and_weekdays_special = [
            f"{match.group(1)}, {match.group(2)}"
            for line in special_hours if (match := re.search(date_pattern, line))
        ]

        special = dict(zip(dates_and_weekdays_special, times_special))
        data_list.append(special)

        times_finals = [
            (match.group() if (match := re.search(time_pattern, hour)) else "Closed")
            for hour in finals_hours
        ]

        days_finals = [re.match(days_pattern, line).group() for line in finals_hours if re.match(days_pattern, line)]

        finals = dict(zip(days_finals, times_finals))
        data_list.append({"Finals Week Date": finals_date})
        data_list.append(finals)    
    # To do (else statement for wooden)
     
    driver.quit()

    # Returns in json format
    return json.dumps(data_list)