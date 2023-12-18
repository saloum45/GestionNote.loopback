import {Entity, model, property} from '@loopback/repository';

@model()
export class Matiere extends Entity {
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
  libelle: string;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;


  constructor(data?: Partial<Matiere>) {
    super(data);
  }
}

export interface MatiereRelations {
  // describe navigational properties here
}

export type MatiereWithRelations = Matiere & MatiereRelations;
