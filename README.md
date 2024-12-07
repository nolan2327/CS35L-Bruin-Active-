# CS35L-Bruin-Active

Project Proposal & Timeline: https://tinyurl.com/bruinactive

<img src="logo_bear.png" width="200" height="200">

## Getting Started

### Prerequisites

In your terminal, clone the repository:

    git clone https://github.com/nolan2327/CS35L-Bruin-Active-

Switch into Bruin Active directory:

    cd CS35L-Bruin-Active-

The program depends on npm from nodejs. Install dependencies (one time only):

    npm install
    
Make sure you have a version of python3 if not refer to here https://www.python.org/downloads/ to download the latest compatible version
    
Run the following pip3 commands: 

    pip3 install selenium python-dotenv pymongo bs4

Then a series of commands for other dependencies:

    cd client/BA_Frontend
    npm install
    cd ../..
    cd server
    npm install
    cd .. 

The project also relies on Google Chrome for the webscrapers. Follow this link https://www.google.com/chrome/ to download Chrome:

### Run the App 

Run frontend and backend together:

    npm start

## Code Structure
For the frontend, we used React CreateApp. For the backend, we used nodejs. For the scripting and web scrapers, we used Python.

## To Note
The scrapers actively go to the web from your computer, so it may take a few seconds to load. Be patient! The same happens with the calendar.