# Timus Full Stack Project

This project contains a full stack web application prepared for the Timus platform (https://www.timusnetworks.com/). The project is developed using Node.js and Vue.js.

## Project Structure

The project consists of two main parts:

1. **Node.js Server:** Located in the `server` folder. The server-side is used to connect to my APIs and process the necessary data.

2. **Vue.js Client:** Located in the `client` folder. The client-side uses Vue.js for the user interface and displaying Timus data.

## How to Get Started

1. **Node.js Server:** Located in the `server` folder. The server-side is used to connect to Timus APIs, manage user sessions, process necessary data, and interact with Elasticsearch.

   - **API Connection:** Modules in the `server/api` folder connect to Timus APIs.
   - **User Management:** User registration, login, and logout processes are managed in the `server/auth` folder.
   - **Data Processing:** User solutions, questions, and other data are processed in the `server/data` folder.
   - **Elasticsearch Integration:** Modules in the `server/elasticsearch` folder interact with Elasticsearch.

2. **Vue.js Client:** Located in the `client` folder. The client-side uses Vue.js to create the user interface, display data from the server, and allow users to interact with Elasticsearch.

   - **User Interface:** Views for viewing questions, submitting solutions, and other user interactions are in `client/src/views`.
   - **Data Display:** Display of questions and user solutions is provided in the `client/src/components` folder.
   - **Routes:** Application routes and navigation are defined in the `client/src/router` folder.

3. **Elasticsearch:** Modules in the `elasticsearch` folder provide interaction with Elasticsearch.

## Packages Used
The project includes the following main packages:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Nest](https://nestjs.com/) - Node.js için bir framework
- [Vue.js](https://vuejs.org/) - JavaScript framework for UI
- [PostgreSQL](https://www.postgresql.org/) - An open source database management system
- [Elasticsearch](https://www.elastic.co/elasticsearch/) - An open source search and analysis engine
- [Vuetify](https://vuetifyjs.com/) - A UI component library for Vue.js
- [Pinia](https://pinia.esm.dev/) - A state management library for Vue.js

# User Login

This project includes a web application where users can log in. Below is an example of a simple user login screen:

## User Login Screen

The user login screen includes email and password fields. When users fill out the form without entering the required fields, error messages are displayed.

![Ekran görüntüsü 2023-12-21 164105](https://github.com/gmzsyt/TimusFinalCase/assets/82291548/c2257ca7-3207-4291-bb4c-b8b734f87c65)


# Language Option

There is a language option in the project. The language of the application can be changed depending on user preferences. There is a language option on the navbar. i18n was used for this

### User Rotting

Routing operations based on user registration status are done in the Vue.js routing file. The relevant file is shaped like this

# Factory Information

This project focuses on the list and details of factories available in the PostgreSQL database.

## Factory List Page

The factory list page shows summary information of factories located in the PostgreSQL database. It contains information such as the name of each factory, membership date, membership expiry date, number of employees and free membership status. Also on this page there is a link to view details of each factory.

![Ekran görüntüsü 2023-12-21 003532](https://github.com/gmzsyt/TimusFinalCase/assets/82291548/88d6d004-03fb-4fdd-8537-f5d88a5e3ebb)

# Modals: Editing and Adding New Fields

This project includes "Edit" and "Add Column" modals to perform editing and adding new fields on tables in the PostgreSQL database.

## Edit Modal

The edit modal is used to edit a record in the table. Users can update existing data using this modal. There are "Save" and "Cancel" buttons in the modal.

## Configuration

Some critical configuration details used within the project are stored in the `.env` file. Before running the project locally or in any other environment, you should fill in the following variables:

![Ekran görüntüsü 2023-12-21 003532](https://github.com/gmzsyt/TimusFinalCase/assets/82291548/c3d51a10-a41e-44ca-9212-fefbe401d46a)
![Ekran görüntüsü 2023-12-21 002118](https://github.com/gmzsyt/TimusFinalCase/assets/82291548/030b45ea-576c-4a2d-9425-8e53585a2722)
```env
ELASTICSEARCH_NODE=https://final-case-4eb2b0.es.us-central1.gcp.cloud.es.io
ELASTICSEARCH_USERNAME=elastic
ELASTICSEARCH_PASSWORD=3l7yEECEMHCTP7yPoS2bt9YK
JWT_SECRET_KEY=mysecretkey
PG_USER='gmzsyt'
PG_HOST='ep-frosty-glitter-97463209.us-west-2.aws.neon.tech'
PG_DATABASE='final_case'
PG_PASSWORD='XIRAHZz35hWw'
# PG_PORT=5432
```

## Deploying the Project

The project has been successfully built and deployed to production. You can access the live application [here](https://final-case-server.onrender.com/).

### Deployment Details:

- **URL:** [https://final-case-server.onrender.com/](https://final-case-server.onrender.com/)

Your suggestions and feedback are important to me.

