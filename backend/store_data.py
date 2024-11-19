import subprocess
from dotenv import load_dotenv
from pymongo import MongoClient
import os

# Load the .env file from the server directory
load_dotenv(dotenv_path='server/.env')

def call_data():
    result_bfit = subprocess.run(['python', 'backend/selenium_scripts/bfit_pull.py'], capture_output=True, text=True)
    result_wooden = subprocess.run(['python', 'backend/selenium_scripts/wooden_pull.py'], capture_output=True, text=True)

    print(result_bfit)
    print(result_wooden)

    data_bfit = result_bfit.stdout
    data_wooden = result_wooden.stdout

    print(data_wooden)
    print(data_bfit)


def store_data(bfit, wooden):
    client = MongoClient(os.getenv('ATLAS_URI'))
    db = client['Bruin-Active']
    collection = db['gym']

    if bfit:
        collection.insert_many(bfit)
    
    if wooden:
        collection.insert_many(wooden)
    
    client.close()

call_data()