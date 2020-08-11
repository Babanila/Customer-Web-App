# backend-node-server

# Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)

## Features

- Get All Customers
- Get Customer by ID
- Create New Customer
- Update Customer by ID
- Delete Customer by ID

## Requirements

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). MacOS and Linux machines typically have this already installed.

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. Make sure to get the latest active LTS version.

- Download the Customer-Web-App from this [link](https://github.com/Babanila/Customer-Web-App) or use `git clone git@github.com:Babanila/Customer-Web-App.git`.

## How to start backend-node-server

- Go to your terminal.
- Locate the downloaded Customer-Web-App directory.
- Change the directory to the Customer-Web-App directory(e.g `cd Customer-Web-App`).
- Change the directory to the backend-node-server directory(e.g `cd backend-node-server`).
- Run `yarn install`.
- To start the server, run `node server.js or yarn start` on your terminal.

### Usage

To run each endpoint, you need

- A web browser
- A running server ( e.g start server with `node server.js or yarn start`).

- Get All Customers endpoint

  - Enter a localhost address using port 5000 (e.g http://localhost:5000/)

- Get Customers by ID endpoint

  - Enter a localhost address using port 5000 (e.g http://localhost:5000/customer/id)
  - id represent your customerID parameter.
  - Example: `http://localhost:5000/customer/1`
  - In the example above `customerID = 1`

- Create New Customer endpoint

  - Enter a localhost address using port 5000 (e.g http://localhost:5000/new_customer)
  - Example: `http://localhost:5000/new_customer`
  - Note: The customer data will be in the `req.body`.

- Update Customers by ID endpoint

  - Enter a localhost address using port 5000 (e.g http://localhost:5000/edit_customer/id)
  - id represent your customerID parameter.
  - Example: `http://localhost:5000/edit_customer/3`
  - In the example above `customerID = 3`
  - The customer data to be updated will be in the `req.body`.

- Delete Customers by ID endpoint

  - Enter a localhost address using port 5000 (e.g http://localhost:5000/delete_customer/id)
  - id represent your customerID parameter.
  - Example: `http://localhost:5000/delete_customer/5`
  - In the example above `customerID = 5`

### To run unit tests

- From the root directory, run `yarn test`
