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
    const beforeLocalidad = await Localidad.count();
    const beforeProvincia = await Provincia.count();
    const bibliotecas = await convertCSVToJSON(fs.readFileSync(path.join(__dirname, './CV.csv')).toString())
    const { numLocalidades, numProvincias } = await extractDataCV(bibliotecas)
    const afterBib = await Biblioteca.count();
    const afterLocalidad = await Localidad.count();
    const afterProvincia = await Provincia.count();

    res.status(200).json({
      message: `|--------------------------------|\n|-COMUNIDAD VALENCIANA-|\n|--------------------------------|\n| ${afterBib - beforeBib} bibliotecas han sido añadidas.\n| ${afterBib - beforeBib === 0 ? bibliotecas.length : 0} bibliotecas han sido actualizadas.\n| ${afterLocalidad - beforeLocalidad} localidades han sido añadidas.\n| ${afterBib - beforeBib === 0 ? numLocalidades : 0} localidades han sido actualizadas.\n| ${afterProvincia - beforeProvincia} provincias han sido añadidas.\n| ${afterProvincia - beforeProvincia === 0 ? numProvincias : 0} provincias han sido actualizadas.`
    })
  } catch (error) {
    handleCatch(error, res)
  }
}