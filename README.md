# Node Project

## Dependencies

Clone the repository to your local machine and run the command below to install the dependencies required.

To install dependencies run:
```
npm i express
```

You will also need to insert your API_KEY of Voltage into the `app.js` file where a comment in the code shows you to.

## Introduction

The purpose of this document is to outline the project specifications you will be working against during the training week.
This document contains the expectations and requirements for the project.

This project involves the topics covered over the previous weeks.

This project is an individual one designed to check your attained knowledge as well as to challenge you to do additional research to complete the given tasks.

Project domain is the creation of a Lightning Node on a platform Voltage. 
In addition, creating an application that will allow you to interact with the Voltage API as well as your Lighning Node.

Initial application with basic functionality will be provided as well as a demo video explaining how the basic application was built.

Voltage platform gives new users some money to use up for free, as long as you will stop/start your node for when you are working on the project this will not cost you any sats.

## Objective

Basic functionality provided in the application includes:
* Enpoint that return information about the first Lighning Node.
* A simple web page with a button, which when clicked calls the Voltage API and return information about your first Lighning Node and displays it on the web page.

Additional features to implement:
* Better UI for existing information display functionality.
* Ability to stop and start your Lightning Node.
* A search field to check if the provided name is suitable for a new Lightning Node creation.
* Extending UI to display information about all the Lightning Nodes under your account.
* Ability to create a new Lightning Node from the web page.
* Ability to delete a Lightning Node from the web page.

It is not mandatory to implement the objectives in the order they are given.

## Scope

This project is a one week project, with an optional presentation of the final version of the application at the end.

The requirements set for the project are below. 

* A functional application created using Express, following best practices and design principles.
* The application should have a basic front-end website.
* Code fully integrated into a Version Control System.

Ask me anything session will be provided to try and answer any questions you might have about the project. 
Additionally, in case of you needing help you can reach out on Discord.

## Constraints

* NodeJS
* Express Framework
* HTML && CSS
* JavaScript
* Postman
* Visual Studio Code (recommended but is optional)
* Any web browser

## Useful links

https://voltage.cloud/

https://api-docs.voltage.cloud/

https://docs.voltage.cloud/developers/api-information/voltage-apis/authentication

## User stories

### User Story 1: Display the information representably

As a user, I want to be able to read the information in a more presentable way so that it could be understood easier.

Acceptance Criteria:

-   The new design will be different from the original design.
-   The information should be in an easy to read formatting.

Bounty: 1000 SATS

### User Story 2: Stop and Start your node

As a user, I want to be able to press a button so that I could stop or start my node depending on it's current status.

Acceptance Criteria:

-   One button that will stop/start the node.
-   The functionality should include a check at the current status of the node.

Bounty: 1000 SATS

### User Story 3: Check if a name for a new node is available

As a user, I want to be able to do a name check in a search field so that I could know if it can be used to create a new node.

Acceptance Criteria:

-   A search field that will check if the name is taken.
-   User will be presented with a text message whether the name is available or taken.

Bounty: 1000 SATS

### User Story 4: Extend existing functionality

As a user, I want to be able to read information about all of my nodes so that I could observe their state.

Acceptance Criteria:

-   Extend the existing functionality to display the information about all of the nodes instead of just the first one.
-   The information should be easy in an easy to read formatting.

Bounty: 1000 SATS

### User Story 5: Create a new node

As a user, I want to be able to provide details through a text field and press a button to initiate the process so that I could create a new node.

Acceptance Criteria:

-   Collect required information through text fields or drop down menus.
-   Have a button to start the creation process.
-   Check that the name is valid and if the name is invalid or other details are incorrect provide user with an appropriate message.

Bounty: 1000 SATS

### User Story 6: Delete a node

As a user, I want to be able to provide node id through a text field and press a button to initiate the process so that my node would be deleted.

Acceptance Criteria:

-   Collect node id through a text field.
-   Have a button to start the deletion process.
-   In case of an error provide user with an appropriate message.

Bounty: 1000 SATS