import {Entity, model, property} from '@loopback/repository';

@model()
export class Apprenant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  matricule: string;

  @property({
    type: 'string',
    required: true,
  })
  nom: string;

  @property({
    type: 'string',
    required: true,
  })
  prenom: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'number',
    required: true,
  })
  classeId: number;

  @property({
    type: 'string',
    required: true,
  })
  pass: string;

  @property({
    type: 'string',
    required: true,
  })
  photo: string;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;


  constructor(data?: Partial<Apprenant>) {
    super(data);
  }
}

export interface ApprenantRelations {
  // describe navigational properties here
}

export type ApprenantWithRelations = Apprenant & ApprenantRelations;
