# Dojo - Cryptocurrency Trading Simulator

## Project Description

Dojo is an experimental cryptocurrency trading simulator built with a Django backend and a vanilla JavaScript frontend. This project utilizes the CoinGecko API for cryptocurrency data and aims to showcase the skills developed throughout the CS50w course. While it is still a work in progress and not ready for live deployment, it serves as a demonstration of web development and cryptocurrency trading knowledge.

## Distinctiveness and Complexity

Dojo stands out as a Capstone project due to its unique concept and complexity. Key features and complexities include:

- User registration and login
- Portfolio management
- Cryptocurrency buying and selling
- Integration with the CoinGecko API for real-time data using Javascript
- User authentication and data models implemented using Django
- Responsive and visually appealing interface with Bootstrap

 My project is distinct and complex in that it required an understanding not only in web development but also in cryptocurrency trading. The project involved implementing a dynamic website that allosws users to register, login, view their portfolio and buy/sell cryptocurrencies. The use of Coingecko API adds an additional layer of complexity to the project, as it involved making API calls using javascript to retrieve real-time cryptocurrency data. The backend of the project invovled implementing user authentication, models, APIs and views using Django. Effort has also been invested in creating an aesthetic interface that is responsive using Bootstrap. 

Despite its ongoing development, Dojo fulfills the requirements for the CS50w Capstone project and can serve as a foundation for future enhancements.

## Directory Structure

- `dojo/main/views.py`: Backend implementation, including authentication, page rendering, and buy/sell functions. Website views and api endponts.
- `dojo/main/urls.py`: App routes configuration.
- `dojo/main/models.py`: Data models for the application.
- `dojo/static/main/js/requests.js`: JavaScript file responsible for making CoinGecko API calls and implementing buy/sell functions.
- `dojo/static/main/css/common.css`: CSS file for styling, supplemented by Bootstrap and inline styles.
- `dojo/templates/main/site`: Templates for the homepage, sign-in, and sign-up pages.
- `dojo/templates/main/app`: Templates for pages accessible after user authentication.
- `dojo/requirements.txt`: List of Python dependencies required to run the app.

## Getting Started

To run a development server for the app, follow these steps:

1. Navigate to the project directory:
   ```
   cd dojo
   ```

2. Apply migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

3. Start the development server:
   ```
   python manage.py runserver
   ```


## Future Development

Dojo is a work in progress, and future development may include:

- Enhanced trading features
- Portfolio analytics, and charts to display inportant data
- Ability to follow other users and see their activity
- Leaderboards and ranking system to gamify the experience
- Ability to view trade history
- Improved user interface and responsiveness
- Security and deployment readiness

## Acknowledgments
I would like to acknowledge the use of the CoinGecko API for providing cryptocurrency data, which is a crucial component of this project.
