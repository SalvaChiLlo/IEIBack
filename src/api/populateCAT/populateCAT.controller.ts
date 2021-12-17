import { Request, Response } from "express";
import { extractDataCAT } from '../../../../ExtractorCAT/src'
import { convertXMLToJSON } from "../../../../IEICAT/src";
const { Biblioteca, Localidad, Provincia } = require('../../sqldb');
import fs from 'fs';
import path from "path";

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
    message: 'Se ha producido un error durante la carga. CAT'
  }).status(500)
}

export async function insert(req: Request, res: Response) {
  try {
    const beforeBib = await Biblioteca.count();
    const bibliotecas = convertXMLToJSON(fs.readFileSync(path.join(__dirname, './CAT.xml')).toString())
    await extractDataCAT(bibliotecas)
    const afterBib = await Biblioteca.count();
    res.status(200).json({
      message: `${afterBib - beforeBib} bibliotecas Catalanas han sido añadidas.\n${afterBib - beforeBib === 0 ? bibliotecas.length : 0} bibliotecas Catalanas han sido actualizadas.`
    })
  } catch (error) {
    handleCatch(error, res)
  }
}