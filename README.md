# cs50w-capstone - Dojo: A cryptocurrency trading simulator written with Django and Javascript

## Project Description
Dojo is an experimental cryptocurrency trading generator build with a Django backend and running on a vanilla javascript front-end. It utilizes the demo coingecko API but besides that, effort has been put into minimizing the dependencies as much as possible. While the product is under continuious development and is far from complete enough to host and deploy live, I beleive it is at a level sufficent for submission as CS50w Capstone project, as a demonstration of the skills I have developed throughout the course.

## Distinctiveness and Complexity
My cs50 Capstone project is unlike any project I've been required to complete as part of the rest of the course. Besides being a different idea and being built from the scratch, my project is distinct and complex in that it riquired an understanding not only in web development but also in cryptocurrency trading. The project involved implementing a dynamic website that allosws users to register, login, view their portfolio and buy/sell cryptocurrencies. The use of Coingecko API adds an additional layer of complexity to the project, as it involved making API calls using javascript to retrieve real-time cryptocurrency data. The backend of the project involed implementing user authentication, models, APIs and views using Django. Effort has also been invested in creating an aesthetic interface that is responsive. In conclusion, though the project is yet to be capable of deployment and still needs the implementation of additional features, It fulfills the requirements for cs50w Capstone Project and can continue its development in the future.

## Directory/Files summary
- `dojo/main/views.py` includes all the implementations so far for the web app's backend, including authentication, page rendering, and buy/sell functions
- `dojo/main/urls.py` Includes all of the app's routes.
- `dojo/main/models.py` includes all of the models on which the app runs
- `dojo/static/main/js/requests.js` is a javascript file which contains all the fetch requests to the CoinGecko API and to also the Buy/Sell functions implemented in models.py. It also includes functions to display a table of currencies, a list of currencies, and a utility function to get specific information about any coin from the CoinGecko API.
- `dojo/static/main/css/common.css` is the only css file of the project, and rather brief as i made use of Bootstrap as well as inline styles,
- `dojo/templates/main/site` is a directory which contains the templates for the homepage, signin, and signup pages.
- `dojo/templates/main/app` Is the directory which contains the templates for all the pages which are seen after the user has signed up/logged in.
- `dojo/requirements.txt` is a list of all the python dependencies required to run the app.

## How to run
To run a development server of the app, run the following commands in the terminal:
```
cd dojo
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```
