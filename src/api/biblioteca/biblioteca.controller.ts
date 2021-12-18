import { BibliotecaModel } from '../../models/biblioteca.models';
'use strict';

import { NextFunction, Request, Response } from "express";

const path = require('path');
const { Biblioteca } = require(path.join(__dirname, '../../sqldb'));
const db = require(path.join(__dirname, '../../sqldb'))
const { QueryTypes } = require('sequelize');


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

/**
 * Uso del método
 * 
 * http://localhost:9000/api/bibliotecas?nombreLocalidad=______&codigoPostal=______&nombreProvincia=______&tipo=______
 * 
 * los guiones bajos deben de ser reemplazados por lo que queremos buscar
 * si no queremos filtrar por algunos de los campos simplemente no le pasamos nada
 * 
 * @param req 
 * @param res 
 */
export async function index(req: Request, res: Response) {
  const query = req.query
  try {
    const bibliotecas = await db.sequelize.query(`
select b.* from "Biblioteca" b
join "Localidad" l on b."LocalidadNombreLocalidad" = l."nombreLocalidad" 
join "Provincia" p on l."ProvinciumNombreProvincia" = p."nombreProvincia" 
where 
l."nombreLocalidad" = ${query.nombreLocalidad && query.nombreLocalidad !== '' ? `'${query.nombreLocalidad}'` : 'l."nombreLocalidad"'}
and
b."codigoPostal" = ${query.codigoPostal && query.codigoPostal !== '' ? `'${query.codigoPostal}'` : 'b."codigoPostal"'}
and
p."nombreProvincia" = ${query.nombreProvincia && query.nombreProvincia !== '' ? `'${query.nombreProvincia}'` : 'p."nombreProvincia"'}
and
b."tipo" = ${query.tipo && query.tipo !== '' ? `'${query.tipo}'` : 'b."tipo"'}
`, {
      model: Biblioteca,
      mapToModel: true
    })

    res.status(200).json(bibliotecas);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Método para obtener todas las localidades y códigos postales disponibles
 * USO:
 * http://localhost:9000/api/bibliotecas/cp?nombreProvincia=________
 * @param req 
 * @param res 
 */
export async function indexPostalCodes(req: Request, res: Response) {
  const query = req.query
  try {
    const cp = await db.sequelize.query(`
select b."codigoPostal", b."LocalidadNombreLocalidad" from "Biblioteca" b
join "Localidad" l on b."LocalidadNombreLocalidad" = l."nombreLocalidad" 
join "Provincia" p on l."ProvinciumNombreProvincia" = p."nombreProvincia"
where
p."nombreProvincia" = ${query.nombreProvincia && query.nombreProvincia !== '' ? `'${query.nombreProvincia}'` : 'p."nombreProvincia"'}
`, {
      type: QueryTypes.SELECT
    })

    res.status(200).json(cp);
  } catch (error) {
    handleCatch(error)
  }
}

/**
 * Método para obtener todos los tipos de bibliotecas
 * USO:
 * http://localhost:9000/api/bibliotecas/tipos
 * @param req 
 * @param res 
 */
export async function indexTipos(req: Request, res: Response) {
  try {
    const cp = await db.sequelize.query(`
select distinct b."tipo" from "Biblioteca" b
`, {
      type: QueryTypes.SELECT
    })

    res.status(200).json(cp);
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
export async function show(req: Request, res: Response) {
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
