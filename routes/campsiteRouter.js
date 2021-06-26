// Code for Handling the REST API endpoints

const express = require("express");
const campsiteRouter = express.Router();

campsiteRouter
  .route("/")

  //Support for REST API endpoint. (chained)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //send back plain text for res body
    next(); // pass control of the app routing to next relevant routing method
  }) //method for catch all HTTP verb

  //GET - READ
  .get((req, res) => {
    res.end("Will send all the campsites to you");
  })

  //Post - CREATE
  .post((req, res) => {
    res.end(
      `Will add the campsite: ${req.body.name} with description: ${req.body.description}`
    );
  })

  //PUT - UPDATE
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /campsites");
  })

  //DELETE
  .delete((req, res) => {
    res.end("Deleting all campsites");
  });

campsiteRouter
  .route("/:campsiteId")

  .all((req, res, next) => {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res) => {
    res.end(`Will send campsite ${req.params.campsiteId} to you`);
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /campsites/${req.params.campsiteId}`
    );
  })

  .put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
           with description: ${req.body.description}`);
  })

  .delete((req, res) => {
    res.end(`Deleting the campsite ${req.params.campsiteId}`);
  });

module.exports = campsiteRouter; // it can be used elsewhere
