# Timus Full Stack Project

This project contains a full stack web application prepared for the Timus platform (https://www.timusnetworks.com/). The project is developed using Node.js and Vue.js.

## Project Structure

The project consists of two main parts:

1. **Node.js Server:** Located in the `server` folder. The server-side is used to connect to Timus APIs and process the necessary data.

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

4. 
## Configuration

Some critical configuration details used within the project are stored in the `.env` file. Before running the project locally or in any other environment, you should fill in the following variables:

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

