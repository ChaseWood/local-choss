# Local Choss

[Local Choss](https://angry-jones-963184.netlify.app/),
an application for searching, finding, and saving rock climbs within a specified area anywhere in the world.

![Image](https://i.imgur.com/h1i7Ywz.png)

## Current Features

- Users can search for climbs.
- Users can click the marker on any climb and get more information about that climb.
- Users can signup for an account.
- With an account users can save climbs to two different lists. A to-do list and a "tick" list which means that the user has climbed that route.

## Technologies Used

- React
- Ruby/Rails
- Mapbox
- Material UI

## Installation Instructions

To set up the app locally on your own system:

1. Fork and Clone this repo as it is the front end.
2. Install all dependencies

```
    yarn install
```

3. Fork and clone the back end [here](https://github.com/ChaseWood/local-choss-api).
4. Install all dependencies.

```
    bundle install
```

5. Ensure you have PostgreSQL installed and running. Then, set up your database.

```
    rails db:create
    rails db:migrate
```

6. Start up your front end server and navigate to the indicated port.

```
    yarn start
    http://localhost:3000
```

7. Start up your rails server.

```
    rails s
```

8. Congrats Local Choss should be set up on your machine locally!

## How to Contribute

1. Clone Repo and create a new branch:
2. Make Changes and test
3. Submit a Pull Request with comprehensive description of changes.

## Acknowledgements

Below is a short list of tutorials and other helpful links I utilized to get this web application up and running in no particular order.

- https://medium.com/better-programming/getting-started-with-react-and-mapbox-gl-js-using-popup-component-with-marker-d76c72824423
- https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
- https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
- https://dev.to/alexmercedcoder/deploying-ruby-on-rails-to-heroku-it-s-easy-ho8
- https://blog.logrocket.com/how-to-use-mapbox-gl/
- https://medium.com/@mendes.develop/populating-your-tables-using-data-from-an-external-api-with-rest-client-and-ruby-on-rails-62817099ff90
- https://stackoverflow.com/questions/32409820/add-an-array-column-in-rails/32410318
- https://excalidraw.com/
