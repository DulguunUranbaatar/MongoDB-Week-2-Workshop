const express = require("express");
const promotionRouter = express.Router();

promotionRouter
  .route("/")

  //Support for REST API endpoint. (chained)
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain"); //send back plain text for res body
    next(); // pass control of the app routing to next relevant routing method
  }) //method for catch all HTTP verb

  //GET - READ
  .get((req, res) => {
    res.end("Will send all the promotions to you");
  })

  //Post - CREATE
  .post((req, res) => {
    res.end(
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })

  //PUT - UPDATE
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotion");
  })

  //DELETE
  .delete((req, res) => {
    res.end("Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")

  .all((req, res, next) => {
    res.status = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((req, res) => {
    res.end(`Will send promotion ${req.params.promotionId} to you`);
  })

  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}`
    );
  })

  .put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
           with description: ${req.body.description}`);
  })

  .delete((req, res) => {
    res.end(`Deleting the promotion ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
