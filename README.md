# Celebration DevOps Project

This project was built as part of my DevOps final project and combines a full web application with deployment, automation, CI/CD, and QA testing.

The application itself is a Node.js web app that includes user-related flows, product management, and a contact form.  
The main goal of the project was to build not just the app, but the whole DevOps process around it — from environment setup and deployment to automated testing.

## What this project includes

- A Node.js / Express web application
- MongoDB as the database
- Docker and Docker Compose for containerized execution
- Ansible for infrastructure and environment setup
- GitHub Actions for CI/CD
- Selenium tests in Python for automated QA

## What I worked on

In this project I focused on building the full workflow around the application:

- Containerizing the app and database using Docker and Docker Compose
- Writing automation for environment setup and deployment
- Creating a CI/CD flow with GitHub Actions
- Adding automated QA tests for important user flows
- Organizing the project so it can be set up and run in a repeatable way

## Main technologies

- Node.js
- Express
- MongoDB
- Docker
- Docker Compose
- Ansible
- AWS EC2
- GitHub Actions
- Selenium
- Python

## Main parts of the project

### Docker and Docker Compose
I created a Dockerfile for the application and used Docker Compose to run both the web application and the database together in a simple and reproducible way.

### Infrastructure automation with Ansible
I wrote an Ansible Playbook to automate the setup of an AWS EC2 environment.  
The automation included installing Docker, preparing the environment, pulling the project, and running the application stack.

### Automated QA with Selenium
I added Selenium tests in Python to validate important parts of the application, including:
- home page availability
- login flow
- product creation flow
- contact form flow
- general regression checks

### CI/CD with GitHub Actions
I created a GitHub Actions workflow that runs automated steps such as:
- test execution
- Docker image build
- pushing the image to DockerHub

## Why I built it this way

The purpose of the project was to practice working on the full lifecycle of an application and not only on the code itself.  
I wanted to connect development, deployment, automation, and testing into one process, in a way that reflects how real systems are built and maintained.

## What I learned

This project helped me improve my understanding of:

- containerized application deployment
- infrastructure automation
- CI/CD pipelines
- automated QA workflows
- working across development, operations, and testing together

## Possible next improvements

If I continue this project, I would like to add:

- better monitoring and logging
- improved test coverage
- stronger secrets management
- separation between development and production environments
- more advanced deployment automation
