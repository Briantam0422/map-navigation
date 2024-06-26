<a name="readme-top"></a>
<br />
<div align="center">

<h3 align="center">Map Navigator</h3>
 <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-success.png">
  
  <p align="center">
    <a href="https://github.com/Briantam0422/map-navigation">
    <strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://map-navigation-five.vercel.app/#google-map">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
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
        <li><a href="#production-build">Production Build</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

A map navigator for delivery services allows users to find the best path and directions to multiple addresses by entering a pick-up location and a drop-off location. It supports location search and autocomplete functions.

<p>App Demo</p>

* URL: https://map-navigation-five.vercel.app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[![Typescript][Typescript]][Typescript]
[![Nextjs][Next.js]][Nextjs-url]
[![TailwindCSS][Tailwindcss]][Tailwindcss-url]
[![Redux][Redux]][Redux]
[![React-query][React-query]][React-query]
[![Jest][Jest]][Jest]
[![Npm][Npm]][Npm]
[![Eslint][Eslint]][Eslint]
[![Github][Github]][Github]
[![Git][Git]][Git]
[![Vercel][Vercel]][Vercel]


### Other Frameworks & Libraries
- NextUI
- TanStack Query
- Google Map API
- React Hot Toast

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
* Clone the repository
* Create a `.env.local` file in the root and specify the following values or Rename `.env.example` file to `.env.local` file in the root.
  * `NEXT_PUBLIC_GOOGLE_MAPS_KEY`=[Your Google Maps API Key]
  * `NEXT_PUBLIC_API_URL`=[Backend Restful API Domain]
  
### Installation
* Root Directory
  * Install dependencies
  ```
  npm i
  ```
  * Run project in local environment
  ```
  npm run dev
  ```
  * Build project for production
  ```
  npm run build
  ```
  * Run unit tests
  ```
  npm run test
  ```
  * Run and watch unit tests
  ```
  npm run test:watch
  ```

### Production Build
1. Make changes in your local branch
2. Run `npm run build` to make sure there is no error
3. Commit and push to the main branch
4. Vercel will automatically build and deploy the project for us

The [Next JS](https://map-navigation-five.vercel.app/) application (Frontend) is hosted on [Vercel](https://vercel.com/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## FEATURES

1. Input Location
   - Enter a Pick-up location in the first search input and a drop-off location in the second search input
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-panel.png">
   - Select a location from the autocomplete dropdown list
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-autocomplete.png">
2. Search Route - Submit Request by clicking the submit button
   - Success Status
     - Show Route Information
     - Display a best delivery route
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-success.png">
   - In Progress Status
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-in_progress.png">
   - Failure Status
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-failure.png">
   - Error Status
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-error.png">
3. Reset Locations by clicking the reset button
4. Try Mock APIs by clicking "Try Mock APIs" button. It will show mock apis options
    <img src="https://github.com/Briantam0422/map-navigation/blob/main/doc/images/form/form-mock-apis.png">
5. Browser compatibility: Latest Chrome, Firefox, and Safari
6. Mobile responsive

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Nextjs-url]: https://nextjs.org/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwindcss-url]: https://tailwindcss.com/
[React-query]: https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Redux]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[Npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Eslint]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
[Github]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[Git]: https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white

