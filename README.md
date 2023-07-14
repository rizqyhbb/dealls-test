This is part of Dealls Frontend test which the requirement can be found [here](https://drive.google.com/file/d/1sLHVcODVplQBWHihxOT4JN68TE39xWsQ/view?usp=sharing)

## Getting Started

This project is build NextJs 13 with Typescript and pinned with volta as node manager. If you are using nvm or any other node version manager or just a nodeJs, please visit `package.json` and search for `volta` to see the version of node that are used.

To run the project in development mode simply just isntall all the dependencies

```bash
yarn
# or
npm install
```

After installing all dependency, just run the project

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stacks

Stack that I'am using and the reason to choose

1. [NextJs 13 (page router)](https://nextjs.org/)
2. [Antd](https://ant.design/)
3. [Emotion](https://emotion.sh/)
4. [Styled-System](https://styled-system.com/)
5. [chartJs](https://react-chartjs-2.js.org/)
6. [jotai](https://jotai.org/)

First of all, NextJs is one of the requirement and most popular framework, so why choosing page router rather than app router? It is simply becase lot of comment from community that I read and heard that it is still lot of performance bugs in production.

Antd is one of UI enterprise level UI library that is well known, easy to use, lot of components and the functionality of the property is quit as much as I need. To powerup the styling for UI library and do some common styling like padding, margin, flex, grid etc I choose emotion combined with styled-system as the utility.

Jotai is something I just try and learn. Why choosing jotai as state management instead of redux ? because it is minimalist, the setup is super easy and yeah just like using useState

## Things will be better if

1. The API provides more options like filtering, search, sorting in a single API as it return same data structure
