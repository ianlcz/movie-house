# movie-house

This project allows you to manage your movies collection.

## Development Team

- **Bordeaux Ynov Campus IT department :**
  - [Yann LE COZ](https://github.com/ianlcz) - Master1 Expert in Web Development

## Installation

You can install the project by cloning this repository:

```sh
$ git clone https://github.com/ianlcz/movie-house.git
```

## Before you start

### Generate your JWT_SECRET

On linux type this command `openssl rand -hex 32` or go to https://generate-secret.now.sh/32.

### Write the .env

You must create the file `.env` in **api** folder with the following keys:

```
MONGO_URI=<YOUR_MONGO_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
```

### Install dependencies

First of all, if you have just cloned the repository you have to install the project dependencies with the command `npm install` in **root** and **api/** folder.

## Usage

Then you will have to type the command `npm start` to launch the project.
