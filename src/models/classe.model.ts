import {Entity, model, property} from '@loopback/repository';

@model()
export class Classe extends Entity {
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
  nom: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;


  constructor(data?: Partial<Classe>) {
    super(data);
  }
}

export interface ClasseRelations {
  // describe navigational properties here
}

export type ClasseWithRelations = Classe & ClasseRelations;
