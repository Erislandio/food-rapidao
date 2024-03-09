export interface ViaCEPAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  error: boolean
}

export interface Address {
  label: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  id: string
}
