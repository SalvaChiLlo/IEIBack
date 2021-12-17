import { Request, Response } from "express";
import path from "path";
import fs from 'fs'
import { extractDataCV } from '../../../../ExtractorCV/src'
import { convertCSVToJSON } from "../../../../IEICV/src";
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
    message: 'Se ha producido un error durante la carga. CV'
  }).status(500)
}

export async function insert(req: Request, res: Response) {
  try {
    const beforeBib = await Biblioteca.count();
    const bibliotecas = await convertCSVToJSON(fs.readFileSync(path.join(__dirname, './CV.csv')).toString())
    await extractDataCV(bibliotecas)
    const afterBib = await Biblioteca.count();
    console.log(afterBib, 'afterBib')
    res.status(200).json({
      message: `${afterBib - beforeBib} bibliotecas Valencianas han sido añadidas.\n${afterBib - beforeBib === 0 ? bibliotecas.length : 0} bibliotecas Valencianas han sido actualizadas.`

    })
  } catch (error) {
    handleCatch(error, res)
  }
}