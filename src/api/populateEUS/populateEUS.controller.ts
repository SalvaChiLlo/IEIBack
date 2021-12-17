import { Request, Response } from "express";
import path from "path";
import fs from 'fs'
import { extractDataEUS } from '../../../../ExtractorEUS/src'
const { Biblioteca, Localidad, Provincia } = require('../../sqldb');

export function validationError(res: Response, statusCode: any) {
  statusCode = statusCode || 422;
  return (err: any) => {
    return res.status(statusCode).json(err);
  };
}

export function handleCatch(error: any, res: Response) {
  console.log('--------------------------------------------------------------------------')
  console.error(error)
  res.json({
    message: 'Se ha producido un error durante la carga. EUS'
  }).status(500)
}

export async function insert(req: Request, res: Response) {
  try {
    const beforeBib = await Biblioteca.count();
    const bibliotecas = JSON.parse(fs.readFileSync(path.join(__dirname, './EUS.json')).toString());
    await extractDataEUS(bibliotecas)
    const afterBib = await Biblioteca.count();
    res.status(200).json({
      message: `${afterBib - beforeBib} bibliotecas Vascas han sido añadidas.\n${afterBib - beforeBib === 0 ? bibliotecas.length : 0} bibliotecas Vascas han sido actualizadas.`
    })
  } catch (error) {
    handleCatch(error, res)
  }
}