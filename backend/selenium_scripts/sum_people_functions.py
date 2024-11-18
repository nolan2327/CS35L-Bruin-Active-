import json
from scraper import fetch_data

'''
    Functionality: Works for BFit & Wooden fetch_data functions. 
        sum_people(): counts the number of people in BFit or John Wooden
        calculate_percentage(): calculates percentage of occupancy given max population and people in gym

    Var: logic
        Pass 1 into logic to select John Wooden Center
        Pass 0 into logic to select BFit
    
    Example uses:
    population = sum_people(1) // Sums the total people from Wooden (pass 0 into arg for Bfit)
    percentage = calculate_Percentage(1000, population) 
'''

def sum_people(logic):
    # Imports the fetch_data function to sum the amount of people in json format
    if(logic == 1):
        # Result from Wooden
        json_result = fetch_data(1)
    else:
        # Result from BFit
        json_result = fetch_data(0)

    # Converts from json
    result = json.loads(json_result)

    # Total count of people
    total_count_people = 0

    # Loop through all locations in gym
    for item in result:
        # Casting a string to an int for numerical opertions. 
        total_count_people += int(item['last_count'])

    # Returns total count for respective gym. 
    return total_count_people

<<<<<<< HEAD
def calculate_Percentage(max_population, total_count_people):
    # Prevent erroneous inputs for max_population
    if(max_population <= 0):
        print("Error: Undefined population maximum.")
        return -1
    
    # Prevent undefined count of people
    if(total_count_people < 0):
        print("Error: Revise total number of people.")
        return -1
    
    # Return number of people in integer format 
    return round((total_count_people/max_population) * 100)
=======

>>>>>>> 6e9ac68 (Rewrote the scraper to avoid code duplications. Now features an argument that handles simple logic. Includes functions to sum people and calculate percentage occupied. Made easy to add extra functions.)
