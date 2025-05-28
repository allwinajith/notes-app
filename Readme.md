# Notes App - MERN Stack with Docker

A full-stack notes application built with MongoDB, Express, React, and Node.js, containerized using Docker.

## Prerequisites

- Docker Desktop ([Windows/Mac](https://www.docker.com/products/docker-desktop/)) or Docker Engine ([Linux](https://docs.docker.com/engine/install/))
- Node.js (v16+) - Only needed if developing outside Docker
- Git

## Project Structure

notes-app/
├── client/ # React frontend
├── server/ # Node.js/Express backend
├── docker-compose.yml
└── .env.example # Environment variables template

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notes-app.git  //from the mern-docker branch
cd notes-app

2. Environment Setup

Copy the example environment file and update the values:
bash
cp .env.example server/.env
Edit the MongoDB connection string in server/.env:

env
MONGO_URI=mongodb://root:example@mongo:27017/notesdb?authSource=admin

Open the docker-compose.yaml file and look for the volumes section. Under that, you'll find a key named device. If it's currently set to '!', remove all the '!' characters. Then, create an empty folder anywhere on your system (you can give it any name), and replace '!' with the full path to that empty folder. Use this path as the value for device.

3. Start the Application

Run the entire stack with Docker Compose:
bash
docker-compose up --build     //This is for running after the setup

This will:

Build the frontend and backend containers
Start MongoDB with persistent storage
Connect all services together

4. Access the Application

Frontend: http://localhost:5173
Backend API: http://localhost:3000
MongoDB: Accessible on port 27017 (only from other containers by default)

Development Workflow

For hot-reloading during development:
bash
docker-compose -f docker-compose.dev.yml up

Stopping the Application
bash
docker-compose down

To completely remove volumes (including database data):
bash
docker-compose down -v
```
