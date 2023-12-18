import {Entity, model, property, hasMany} from '@loopback/repository';
import {Apprenant} from './apprenant.model';
import {Professeur} from './professeur.model';

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

  @hasMany(() => Apprenant)
  apprenants: Apprenant[];

  @hasMany(() => Professeur)
  professeurs: Professeur[];

  constructor(data?: Partial<Classe>) {
    super(data);
  }
}

export interface ClasseRelations {
  // describe navigational properties here
}

export type ClasseWithRelations = Classe & ClasseRelations;
