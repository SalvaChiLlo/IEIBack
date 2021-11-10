import { Request, Response } from "express";
import { extractDataCAT } from '../../../../ExtractorCAT/src'
import { convertXMLToJSON } from "../../../../IEICAT/src";

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
    const bibliotecas = convertXMLToJSON(req.body.bibliotecas)
    await extractDataCAT(bibliotecas)
    res.status(200).json({
      message: `Se han añadido o actualizado ${bibliotecas.length} bibliotecas!!`
    })
  } catch (error) {
    handleCatch(error, res)
  }
}