import { BibliotecaModel } from './../models/biblioteca.models';
'use strict';

import { NextFunction, Request, Response } from "express";

const path = require('path');
const { Biblioteca } = require(path.join(__dirname, '../../sqldb'));
const db = require(path.join(__dirname, '../../sqldb'))

export function validationError(res: Response, statusCode: any) {
  statusCode = statusCode || 422;
  return (err: any) => {
    return res.status(statusCode).json(err);
  };
}

export function handleCatch(error: any) {
  console.log('--------------------------------------------------------------------------')
  console.error(error)
  process.exit(1)
}

export async function index(req: Request, res: Response) {
  try {
    console.log(req.query, 'PARAMS')
    const query = req.query;
    let bibliotecas = [];
    if (query.codigoLocalidad && query.codigoProvincia || query.codigoLocalidad) {
      bibliotecas = await Biblioteca.findAll({
        where: {
          LocalidadCodigoLocalidad: query.codigoLocalidad
        },
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })
    } else if (query.codigoProvincia) {
      bibliotecas = await Biblioteca.findAll({
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })

      bibliotecas = bibliotecas
        .filter((biblioteca: BibliotecaModel) => biblioteca.Localidad?.Provincium.codigoProvincia === query.codigoProvincia)
    } else {
      bibliotecas = await Biblioteca.findAll({
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      })
    }

    res.status(200).json(bibliotecas);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
export function create(req: Request, res: Response) {
  const newBibl = Biblioteca.build(req.body);
  return newBibl.save()
    .then((biblioteca: BibliotecaModel) => {
      Biblioteca.findAll({
        where: { id: biblioteca.id },
        include: [
          {
            model: db.Localidad,
            include: {
              model: db.Provincia
            }
          }
        ]
      }).then((bibl: any) => {
        res.json(bibl);
      })
    })
    .catch((err: Error) => validationError(res, 404));
}

/**
 * Get a single product
 */
export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const bibliotecas = await Biblioteca.findAll({
      where: {
        id
      },
      include: [
        {
          model: db.Localidad,
          include: {
            model: db.Provincia
          }
        }
      ]
    })
    res.status(200).json(bibliotecas);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await Biblioteca.destroy({
      where: {
        id
      }
    })
    res.status(204).end();
  } catch (error) {
    handleCatch(error)
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
  const userId = req.params.userId;
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return Biblioteca.find({
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
      } else {
        return res.status(403).end();
      }
    });
}
