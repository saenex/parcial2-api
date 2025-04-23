const { Curso } = require("../models");
const response = require("../utils/response");

const getAll = async (req, res, next) => 
    {
  try 
  {
    const cursos = await Curso.findAll(); //  Devuelve todos los campos

    let data = "";
    if (cursos.length > 0) 
        {
      data = 
      {
        total_registros: cursos.length,
        registros: cursos, // ← Todos los campos se incluyen aquí
      };
    } 
    else 
    {
      data = 
      {
        message: "No hay cursos registrados",
      };
    }

    response.success(req, res, data, 200);
  } 
  catch (error) 
  {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try 
  {
    const id = req.params.id;
    const curso = await Curso.findOne({ where: { id } });

    let data = "";
    if (curso) {
      data = {
        registro: curso, //  Devuelve todos los campos de un curso
      };
    } else {
      data = {
        message: "No existe un curso con ese ID",
      };
    }

    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const data = req.body;
    await Curso.sync(); // crea la tabla si no existe (usa { force: true } si hay cambios en estructura)
    const createdCurso = await Curso.create(data);

    const message = createdCurso.id
      ? { msg: "Curso registrado exitosamente", regId: createdCurso.id }
      : { msg: "Error, curso no creado" };

    response.success(req, res, message, 201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await Curso.update(data, { where: { id } });

    const message = {
      msg: "Curso actualizado exitosamente",
      regId: id,
    };

    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
};

const deleted = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Curso.destroy({ where: { id } });

    const message = {
      msg: "Curso eliminado exitosamente",
      regId: id,
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
  deleted,
};
