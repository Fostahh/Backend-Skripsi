const {
  getDisastersHandler,
  getDisasterByFilterHandler,
  getDisasterByIdHandler,
  cannotBeAccessedByThoseMethodHandler,
  endpointNotFoundHandler,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello world!";
    },
  },
  {
    method: "*",
    path: "/",
    handler: cannotBeAccessedByThoseMethodHandler,
  },
  {
    method: "GET",
    path: "/disasters",
    handler: getDisastersHandler,
  },
  {
    method: "GET",
    path: "/disasters/filter/{filter}",
    handler: getDisasterByFilterHandler,
  },
  {
    method: "*",
    path: "/disasters",
    handler: cannotBeAccessedByThoseMethodHandler,
  },
  {
    method: "GET",
    path: "/disasters/{id}",
    handler: getDisasterByIdHandler,
  },
  {
    method: "*",
    path: "/disasters/{id}",
    handler: cannotBeAccessedByThoseMethodHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: endpointNotFoundHandler,
  },
];

module.exports = routes;
