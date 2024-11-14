import subprocess
import json
from pymongo import MongoClient
import os

def call_data():
    result_bfit = subprocess.run(['python', 'backend/selenium_scripts/bfit_pull.py'], capture_output=True, text=True)
    result_wooden = subprocess.run(['python', 'backend/selenium_scripts/wooden_pull.py'], capture_output=True, text=True)

    data_bfit = json.loads(result_bfit.stdout)
    data_wooden = json.loads(result_wooden.stdout)

    store_data(data_bfit, data_wooden)


def store_data(bfit, wooden):
    client = MongoClient(os.getenv("MONGODB_URI"))
    #uri: mongodb+srv://bruinactiveadmin:UoGCwIENUOywpaq6@bruinactivecluster.yi8fe.mongodb.net/?retryWrites=true&w=majority&appName=BruinActiveCluster
    db = client['Bruin-Active']
    #db: Bruin-Active
    collection = db['gym']
    #collection: gym

    if bfit:
        collection.insert_many(bfit)
    
    if wooden:
        collection.insert_many(wooden)
    
    client.close()