const express = require("express");
const Favorite = require("../models/favorite");
const cors = require("./cors");
const authenticate = require("../authenticate");

const favoriteRouter = express.Router();

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate("favorites.user")
      .populate("favorites.campsites")
      .then((favorite) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(favorite);
      })
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          req.body.forEach((bodyId) => {
            if (!favorite.campsites.includes(bodyId._id)) {
              favorite.push(bodyId._id);
            }
          });
          favorite.save().then((newfavorite) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(newfavorite);
          });
        } else {
          Favorite.create({ user: req.user._id, campsites: req.body })
            .then((favorite) => {
              console.log("Add to Favorite ", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Operation not supported on /favorites`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
      .then((response) => {
        if (response) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(response);
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.end("You do not have any favorites to delete.");
        }
      })
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:campsiteId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Operation not supported on /favorites`);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.params.campsiteId })
      .then((favorite) => {
        if (favorite) {
          if (favorite.campsites.indexOf(favorite.campsiteId) === -1) {
            favorite.campsites.push(favorite.campsiteId);
          }
          favorite
            .save()
            .then((favorite) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        } else {
          Favorite.create({
            user: req.user._id,
            campsites: req.body,
          })
            .then((favorite) => {
              console.log("Favorite Created ", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            })
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })

  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`Operation not supported on /favorites`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.params.campsiteId })
      .then((favorite) => {
        if (favorite) {
          if (favorite.campsites.indexOf(req.params.campsiteId !== 1)) {
            favorite.campsites.splice(
              favorite.campsites.indexOf(req.params.campsiteId),
              1
            );
            favorite
              .save()
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              })
              .catch((err) => next(err));
          } else {
            res.setHeader("Content-Type", "text/plain");
            res.end("There are no favorites to delete");
          }
        }
      })
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
