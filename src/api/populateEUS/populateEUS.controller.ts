import { Request, Response } from "express";
import path from "path";
import fs from 'fs'
import { extractDataEUS } from '../../../../ExtractorEUS/src'

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
    await extractDataEUS(JSON.parse(fs.readFileSync(path.join(__dirname, './EUS.json')).toString()))
    res.status(200).json({
      message: `Se han añadido o actualizado ${req.body.bibliotecas.length} bibliotecas!!`
    })
  } catch (error) {
    handleCatch(error, res)
  }
}