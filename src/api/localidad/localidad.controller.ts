import e, { NextFunction, Request, Response } from 'express';
import { LocalidadModel } from '../../models/biblioteca.models';

'use strict';
const path = require('path');

const { Localidad } = require(path.join(__dirname, '../../sqldb'));
const config = require(path.join(__dirname, '../../config/environment'));
const jwt = require('jsonwebtoken');

const db = require(path.join(__dirname, '../../sqldb'));

export function validationError(res: Response, statusCode: number) {
  statusCode = statusCode || 422;
  return (err: Error) => res.status(statusCode).json(err);
}

export function handleError(res: Response, statusCode: number) {
  statusCode = statusCode || 500;
  return (err: Error) => res.status(statusCode).send(err);
}

export function handleCatch(error: Error) {
  console.log('--------------------------------------------------------------------------');
  console.error(error);
  process.exit(1);
}

export async function index(req: Request, res: Response) {
  try {
    console.log(req.query, 'PARAMS');
    const { query } = req;
    let localidades = [];
    localidades = await Localidad.findAll();

    res.status(200).json(localidades);
  } catch (error: any) {
    handleCatch(error);
  }
}

/**
 * Creates a new product
 */
export function create(req: Request, res: Response) {
  const newLocalidad = Localidad.build(req.body);
  return newLocalidad.save()
    .then((localidad: LocalidadModel) => {
      Localidad.findAll({
        where: { codigoLocalidad: localidad.codigoLocalidad },
        include: [
          {
            model: db.Provincia,
          },
        ],
      }).then((local: LocalidadModel) => {
        res.json(local);
      });
    })
    .catch(validationError(res, 404));
}

/**
 * Get a single product
 */
export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombreLocalidad } = req.params;
    const bibliotecas = await Localidad.findAll({
      where: {
        nombreLocalidad,
      },
    });
    res.status(200).json(bibliotecas);
  } catch (error: any) {
    handleCatch(error);
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req: Request, res: Response) {
  try {
    const { codigoLocalidad } = req.params;
    await Localidad.destroy({
      where: {
        codigoLocalidad,
      },
    });
    res.status(204).end();
  } catch (error: any) {
    handleCatch(error);
  }
}

/**
 * Change a users password
 */
export function changePassword(req: Request, res: Response) {
  throw Error(`
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
|||Falta implementar||||||Falta implementar||||||Falta implementar||||||Falta implementar|||
--------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------
  `);
  const { userId } = req.params;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return Localidad.find({
    where: {
      id: userId,
    },
  })
    .then((user: any) => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res, 404));
      }
      return res.status(403).end();
    });
}
