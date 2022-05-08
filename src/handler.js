const disasters = require("./disasters");
const { Firestore } = require("@google-cloud/firestore");

const db = new Firestore();

const addDisasterHandler = (request, h) => {
  const { id, latitude, longitude } = request.payload;

  const newDisaster = {
    id,
    latitude,
    longitude,
  };

  disasters.push(newDisaster);

  const isSuccess =
    disasters.filter((disaster) => disaster.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Bencana Alam berhasil ditambahkan",
      data: {
        disasterId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Bencana Alam gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getDisastersHandler = async (request, h) => {
  const query = db.collection("disasters");
  const querySnapshot = query.get();

  if (querySnapshot.size > 0) {
    const a = querySnapshot.docs.data;
    return h.response({
      status: "success",
      data: { a },
    });
  } else {
    return h.response({
      status: "success",
      data: { disasters },
    });
  }
};

const getDisasterByIdHandler = (request, h) => {
  const { id } = request.params;

  const disaster = disasters.filter((d) => d.id == id)[0];

  if (disaster !== undefined) {
    return {
      status: "success",
      data: {
        disaster,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Bencana alam tidak ditemukan",
  });
  response.code(404);
  return response;
};

const cannotBeAccessedByThoseMethodHandler = (request, h) => {
  return "Halaman tidak dapat diakses dengan method tersebut!";
};

const endpointNotFoundHandler = (request, h) => {
  return "Halaman tidak ditemukan";
};

module.exports = {
  addDisasterHandler,
  getDisastersHandler,
  getDisasterByIdHandler,
  cannotBeAccessedByThoseMethodHandler,
  endpointNotFoundHandler,
};
