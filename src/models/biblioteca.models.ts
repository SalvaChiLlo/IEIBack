// Generated by https://quicktype.io

export interface BibliotecaModel {
  id?: number;
  nombre: string;
  tipo: string;
  direccion: string;
  codigoPostal: string;
  longitud: number;
  latitud: number;
  telefono: string;
  email: string;
  descripcion: string;
  web: string;
  createdAt?: string;
  updatedAt?: string;
  LocalidadNombreLocalidad: string;
  Localidad?: LocalidadModel;
}

export interface LocalidadModel {
  codigoLocalidad: string;
  nombreLocalidad: string;
  createdAt?: string;
  updatedAt?: string;
  ProvinciumNombreProvincia: string;
  Provincium?: ProvinciumModel;
}

export interface ProvinciumModel {
  codigoProvincia: string;
  nombreProvincia: string;
  createdAt?: string;
  updatedAt?: string;
}

// Generated by https://quicktype.io

export interface GeoCoder {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  streetName: string;
  countryCode: string;
  provider: string;
}
