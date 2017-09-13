# FilmPolis (MicroServices)

FilmPolis' Microservices are independient services to consult of movies, actors and directors.
There is a total of 12k+ movies, 12k+ actors and 6k+ directors to consult.

## Getting Started

Change the current working directory to the location where you want the cloned directory to be made.

Type git clone, and then paste the URL of this project:

```
git clone https://github.com/Migue1m1/FilmPolis-Microservices.git
```

### Prerequisites

You need to install:

* [NodeJs](https://nodejs.org)
* [MongoDB](https://www.mongodb.com)
* [TypeScript](https://www.typescriptlang.org)

### Installing

Open the terminal in the folder of the respective microservice, and type:

```
npm install
```
Once packages have been installed, type:

```
gulp scripts
```

Then:

```
npm start
```

## Running the tests

After all the packages have been installed, type:

```
npm test
```

## Deployment

To obtain all the information, was made use of a movie *data set* in [Neo4j](https://neo4j.com/), migrating all the information through software written in java.

* [MovieNeo4jToJSON](https://github.com/Migue1m1/MovieNeo4jToJSON) - A software developed by me, to obtain all the information in json format.

* [Neo4j](https://neo4j.com/) - The #1 platform to connected data.


## Built With

* [NodeJs](https://nodejs.org) - is an open source server framework. Allows you to run JavaScript on the server.
* [MongoDB](https://www.mongodb.com) - is a free and open-source cross-platform document-oriented NoSql database program.
* [ExpressJs](http://expressjs.com) - is designed for building web applications and APIs.
* [TypeScript](https://www.typescriptlang.org) - is a typed superset of JavaScript that compiles to plain JavaScript.

## Authors

* **Miguel Guevara** - *A work of microservices* - [Migue1m1](https://github.com/Migue1m1)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* To me
* Hat tip to anyone who's code was used
* To me

