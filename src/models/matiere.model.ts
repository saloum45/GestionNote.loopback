import {Entity, model, property, hasMany} from '@loopback/repository';
import {Professeur} from './professeur.model';

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

  @hasMany(() => Professeur)
  professeurs: Professeur[];

  constructor(data?: Partial<Matiere>) {
    super(data);
  }
}

export interface MatiereRelations {
  // describe navigational properties here
}

export type MatiereWithRelations = Matiere & MatiereRelations;
