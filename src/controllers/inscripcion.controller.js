const { Inscripcion, Estudiante, Curso } = require("../models");
const response = require("../utils/response");

const getAll = async (req, res, next) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [
        { model: Estudiante },
        { model: Curso }
      ]
    });

    const data = inscripciones.length > 0
      ? { total_registros: inscripciones.length, registros: inscripciones }
      : { message: "No hay inscripciones registradas" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const inscripcion = await Inscripcion.findOne({
      where: { id },
      include: [
        { model: Estudiante },
        { model: Curso }
      ]
    });

    const data = inscripcion
      ? { registro: inscripcion }
      : { message: "No existe una inscripción con ese ID" };

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Inscripcion.sync(); // solo si no ha sido creada
    const created = await Inscripcion.create(data);

    const message = created.id
      ? { msg: "Inscripción registrada exitosamente", regId: created.id }
      : { msg: "Error, inscripción no creada" };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Inscripcion.update(data, { where: { id } });

    const message = {
      msg: "Inscripción actualizada exitosamente",
      regId: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Inscripcion.destroy({ where: { id } });

    const message = {
      msg: "Inscripción eliminada exitosamente",
      regId: id
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleted
};
