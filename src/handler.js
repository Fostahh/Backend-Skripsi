const mysql = require("mysql");

const con = mysql.createConnection({
  host: "34.142.231.201",
  user: "azri",
  password: "12345",
  database: "db_skripsi",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database connected");
});

const getDisastersHandler = async (_, h) => {
  return new Promise((resolve, _) => {
    con.query(
      "SELECT * FROM bencana_alam WHERE lat IS NOT NULL AND lon IS NOT NULL AND predicted = '0'",
      (err, data) => {
        if (err)
          return resolve(
            h
              .response({
                status: "fail",
                message: `${err.message}`,
              })
              .code(400)
          );

        if (data.length > 0) {
          return resolve(
            h
              .response({
                status: "success",
                data,
              })
              .code(200)
          );
        } else {
          return resolve(
            h
              .response({
                status: "success",
                message: "Tidak ada bencana alam",
              })
              .code(200)
          );
        }
      }
    );
  });
};

const getDisasterByFilterHandler = async (request, h) => {
  const { filter } = request.params;

  if (filter === "gempa") {
    return new Promise((resolve, _) => {
      con.query(
        "SELECT * FROM bencana_alam WHERE filter = ? AND lat IS NOT NULL AND lon IS NOT NULL AND mag IS NOT NULL AND predicted = '0'",
        [filter],
        (err, data) => {
          if (err)
            return resolve(
              h
                .response({
                  status: "fail",
                  message: `${err.message}`,
                })
                .code(400)
            );

          if (data.length > 0) {
            return resolve(
              h
                .response({
                  status: "success",
                  data,
                })
                .code(200)
            );
          } else {
            return resolve(
              h
                .response({
                  status: "success",
                  message: `Bencana alam dengan filter ${filter} tidak ditemukan!`,
                })
                .code(200)
            );
          }
        }
      );
    });
  } else {
    return new Promise((resolve, _) => {
      con.query(
        "SELECT * FROM bencana_alam WHERE filter = ? AND lat IS NOT NULL AND lon IS NOT NULL AND predicted = '0'",
        [filter],
        (err, data) => {
          if (err)
            return resolve(
              h
                .response({
                  status: "fail",
                  message: `${err.message}`,
                })
                .code(400)
            );

          if (data.length > 0) {
            return resolve(
              h
                .response({
                  status: "success",
                  data,
                })
                .code(200)
            );
          } else {
            return resolve(
              h
                .response({
                  status: "success",
                  message: `Bencana alam dengan filter ${filter} tidak ditemukan!`,
                })
                .code(200)
            );
          }
        }
      );
    });
  }
};

const getDisasterByIdHandler = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve, _) => {
    con.query(
      "SELECT * FROM bencana_alam WHERE id = '?'",
      [id],
      (err, data) => {
        if (err)
          return resolve(
            h
              .response({
                status: "fail",
                message: `${err.message}`,
              })
              .code(400)
          );

        if (data.length > 0) {
          return resolve(
            h
              .response({
                status: "success",
                data,
              })
              .code(200)
          );
        } else {
          return resolve(
            h
              .response({
                status: "success",
                message: "Bencana alam tidak ditemukan",
              })
              .code(200)
          );
        }
      }
    );
  });
};

const cannotBeAccessedByThoseMethodHandler = (request, h) => {
  return "Halaman tidak dapat diakses dengan method tersebut!";
};

const endpointNotFoundHandler = (request, h) => {
  return "Halaman tidak ditemukan";
};

module.exports = {
  getDisastersHandler,
  getDisasterByFilterHandler,
  getDisasterByIdHandler,
  cannotBeAccessedByThoseMethodHandler,
  endpointNotFoundHandler,
};
