[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.w3schools.com/js/js_es6.asp)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)][mongodb-url]
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)][expressjs-url]
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)][react-url]
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)][nodejs-url]
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
[![Visual Studio Code](https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)][linkedin-url]
[![Socket.io](https://img.shields.io/static/v1?label=&message=Socket.io&color=blueviolet&style=for-the-badge&logo=socketio)][socketio-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
  <h1 align="center">Pokemon Trade</h1>

  <h2 align="center">A Pokémon collector's go-to app</h2>
  <p align="center">
    <a href="https://github.com/salimzay/cb-final-project"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/salimzay/cb-final-project/issues">Report Bug</a>
    ·
    <a href="https://github.com/salimzay/cb-final-project/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img align="center" src="images/homepage.gif" alt="Homepage" width="75%"></img>

### Welcome to the Pokemon Trade!

This year marks the 25<sup>th</sup> anniversary of the now very popular Pokémon Trading Card Game so, as my Bootcamp's capstone project, I decided to do an app for all the Pokémon collectors out there!

This app is built for collectors to save all cards they have in their own database, as well as keeping track of cards they want in their wish list.

You can search for any card from any set and it should be there thanks to the [PokemonTCG Api](https://pokemontcg.io/)!

Have any cards you want to sell/trade? You can add those cards in your <em>Binder</em>, where other users are able to see.

If you or another user see any cards you are interested in in each others' binder, you can add each other as friends. Afterwards, you can message each other in private to work something out by yourselves.

### Built With

- [MongoDB][mongodb-url]
- [ExpressJs][expressjs-url]
- [ReactJs][react-url]
- [NodeJs][nodejs-url]
- [Socket.io][socketio-url]

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

As most of the times, you would need npm and/or yarn

- npm

  ```sh
  npm install npm@latest -g
  ```

- yarn
  ```sh
  npm install yarn
  ```

### Installation

You may need to ask for access to the MongoDB database

1. Get a free API Key at [https://pokemontcg.io/](https://pokemontcg.io/)
2. Clone the repo
   ```sh
   git clone https://github.com/salimzay/cb-final-project.git
   ```
3. Install NPM packages in each folder (/client, /server, /socket)
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```
4. Enter your API in `client/.env`
   ```JS
   REACT_APP_POKETCG_API_KEY = 'ENTER YOUR API';
   ```
5. Enter your Mongo URI in `server/.env`
   ```JS
   MONGO_URI= 'ENTER YOUR MONGO URI';
   ```

<!-- USAGE EXAMPLES -->

## Usage

To start up the web application, you will need to open three different terminals. One for your Socket.io server, one for your ExpressJs backend, and one for your ReactJs frontend.

To start up, here are the command line for each terminal in that specific order:

### Socket.io server

```sh
npm run dev:socket
```

or

```sh
yarn dev:socket
```

### Backend

```sh
npm run dev:backend
```

or

```sh
yarn dev:backend
```

### Frontend

```sh
npm run dev:frontend
```

or

```sh
yarn dev:frontend
```

Afterwards, you can start browsing the webpage and check out its full features!

<!-- ROADMAP -->

## To Do

- List/Grid view for My List and Wish List
- Criterias for search cards
- In-App notifications
- Search users
- Search users by cards in binder
- Night/Day theme
- JWT Tokens
- Better locations system

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

Salim Zaywari - [salim.zay@hotmail.com](mailto:salim.zay@hotmail.com)

Project Link: [https://github.com/salimzay/cb-final-project](https://github.com/salimzay/cb-final-project)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- ## [PokemonTCG Api](https://pokemontcg.io/)
- ### [Concordia Bootcamp](https://concordiabootcamps.ca/)
- #### [Styled Components](https://styled-components.com/)
- #### [React Icons](https://react-icons.github.io/react-icons/)
- [Google Fonts](https://fonts.google.com/)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/salimzay/
[mongodb-url]: https://www.mongodb.com/
[expressjs-url]: https://expressjs.com/
[react-url]: https://reactjs.org/
[nodejs-url]: https://nodejs.org/en/
[socketio-url]: https://socket.io/
