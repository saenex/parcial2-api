const { Estudiante } = require("../models");
const response = require("../utils/response");

const getAll = async(req, res, next) => {
    try {    
        const estudiantes = await Estudiante.findAll();
        let data = "";
        if (estudiantes.length > 0) {
            data = {
                total_registros: estudiantes.length,
                registros: estudiantes
            }
        } else {
            data = {
                message: "No hay estudiantes registrados"
            }
        } 
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
};

const getOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const estudiante = await Estudiante.findOne({where: {id}});
        let data = "";
        if (estudiante) {
            data = {
                registro: estudiante
            }
        } else {
            data = {
                message: "No existe un estudiante con ese ID"
            }
        } 
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const data = req.body;
        await Estudiante.sync();
        const createdEstudiante = await Estudiante.create(data);
        let message;
        if (createdEstudiante.id) {
            message = {
                msg: "Estudiante registrado exitosamente",
                regId: createdEstudiante.id
            }
        } else {
            message = {
                msg: "Error, estudiante no creado"
            }
        }
        response.success(req, res, message, 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const data = req.body;
        const id = req.params.id;
        const updatedEstudiante = await Estudiante.update(data, {where: {id}});
        message = {
            msg: "Estudiante actualizado exitosamente",
            regId: id
        }
        response.success(req, res, message, 200);
    } catch (error) {
        next(error);
    }
};

const deleted = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedEstudiante = await Estudiante.destroy({where: {id}});
        let message = {
            msg: "Estudiante eliminado exitosamente",
            regId: id
        }
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