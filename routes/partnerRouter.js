const express = require("express");
const partnerRouter = express.Router();

partnerRouter
  .route("/")

  //Support for REST API endpoint. (chained)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //send back plain text for res body
    next(); // pass control of the app routing to next relevant routing method
  }) //method for catch all HTTP verb

  //GET - READ
  .get((req, res) => {
    res.end("Will send all the partners info to you");
  })

  //Post - CREATE
  .post((req, res) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })

  //PUT - UPDATE
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })

  //DELETE
  .delete((req, res) => {
    res.end("Deleting all partners");
  });

partnerRouter
  .route("/:partnerId")

  .all((req, res, next) => {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res) => {
    res.end(`Will send partner ${req.params.partnerId} to you`);
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })

  .put((req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
           with description: ${req.body.description}`);
  })

  .delete((req, res) => {
    res.end(`Deleting the partner ${req.params.partnerId}`);
  });

module.exports = partnerRouter;
