import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Matiere} from './matiere.model';
import {Classe} from './classe.model';

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
    type: 'string',
    required: true,
  })
  etat: string;
  @property({
    type: 'string',
    required: true,
  })
  pass: string;

  @belongsTo(() => Matiere, {name: 'matiere_professeur'})
  matiereId: number;

  @belongsTo(() => Classe, {name: 'classe_professeur'})
  classeId: number;

  constructor(data?: Partial<Professeur>) {
    super(data);
  }
}

export interface ProfesseurRelations {
  // describe navigational properties here
}

export type ProfesseurWithRelations = Professeur & ProfesseurRelations;
