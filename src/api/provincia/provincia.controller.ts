'use strict';

import { NextFunction, Request, Response } from "express";
import { ProvinciumModel } from "../models/biblioteca.models";

const path = require('path')
const { Provincia } = require(path.join(__dirname, '../../sqldb'));
const config = require(path.join(__dirname, '../../config/environment'));
const jwt = require('jsonwebtoken');
const db = require(path.join(__dirname, '../../sqldb'));

export function validationError(res: Response, statusCode: number) {
  statusCode = statusCode || 422;
  return (err: Error) => {
    return res.status(statusCode).json(err);
  };
}

export function handleError(res: Response, statusCode: number) {
  statusCode = statusCode || 500;
  return (err: Error) => {
    return res.status(statusCode).send(err);
  };
}

export function handleCatch(error: Error) {
  console.log('--------------------------------------------------------------------------')
  console.error(error)
  process.exit(1)
}

export async function index(req: Request, res: Response) {
  try {
    let provincias = [];
    provincias = await Provincia.findAll({
      include: [
        {
          all: true
        }
      ]
    })

    res.status(200).json(provincias);
  } catch (error: any) {
    handleCatch(error)
  }
}

/**
 * Creates a new product
 */
export function create(req: Request, res: Response) {
  const newProvincia = Provincia.build(req.body);
  return newProvincia.save()
    .then((provincia: ProvinciumModel) => {
      Provincia.findAll({
        where: { codigoProvincia: provincia.codigoProvincia },
        include: [
          {
            all: true
          }
        ]
      }).then((prov: ProvinciumModel) => {
        res.json(prov);
      })
    })
    .catch(validationError(res, 404));
}

/**
 * Get a single product
 */
export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const codigoProvincia = req.params.codigoProvincia;
    const provincias = await Provincia.findAll({
      where: {
        codigoProvincia
      },
      include: [
        {
          all: true
        }
      ]
    })
    res.status(200).json(provincias);
  } catch (error: any) {
    handleCatch(error)
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function destroy(req: Request, res: Response) {
  try {
    const codigoProvincia = req.params.codigoProvincia;
    await Provincia.destroy({
      where: {
        codigoProvincia
      }
    })
    res.status(204).end();
  } catch (error: any) {
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

  return Provincia.find({
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

module.exports = {
  index,
  show,
  create,
  destroy,
  changePassword,
};
