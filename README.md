# Be the QA

This repository will be used for API testing in the Be the QA workshop.


# Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) - this is optional, NPN works just fine but Yarn is our preferred choice

# Installation steps
- Open the terminal and navigate to the location you want to clone the project
- Run the `git clone git@github.com:vdragomir/be_the_qa.git` command
- After the download has completed, run `cd be_the_qa/cypress`
- In the `cypress` directory, run the `npm install` or `yarn install` command in order to install the required dependencies

# Running the tests

For running the tests, we have two options: 

1. Running the tests from the command line
	
	- In the `cypress` directory, run the `yarn run:tests` or `npm run run:tests` command. It will run the tests in the headless mode.
2. Running the tests using the Test Runner

	- In the `cypress` directory, run the `yarn cypress open` or `npm run cypress open`command. It will open the Test Runner and you can run the tests by clicking on the test name.

