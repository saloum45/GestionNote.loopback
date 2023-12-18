import {Entity, model, property} from '@loopback/repository';

@model()
export class Professeur extends Entity {
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
  image: string;

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
    type: 'number',
    required: true,
  })
  matiereId: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  telephone: string;

  @property({
    type: 'number',
    required: true,
  })
  classeId: number;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;


  constructor(data?: Partial<Professeur>) {
    super(data);
  }
}

export interface ProfesseurRelations {
  // describe navigational properties here
}

export type ProfesseurWithRelations = Professeur & ProfesseurRelations;
