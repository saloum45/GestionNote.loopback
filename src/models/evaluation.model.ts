import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Classe} from './classe.model';
import {Matiere} from './matiere.model';
import {Note} from './note.model';

@model()
export class Evaluation extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  etat: string;
  @belongsTo(() => Classe, {name: 'classe_evaluation'})
  classeId: number;

  @belongsTo(() => Matiere, {name: 'matiere_evaluation'})
  matiereId: number;

  @hasMany(() => Note)
  notes: Note[];

  constructor(data?: Partial<Evaluation>) {
    super(data);
  }
}

export interface EvaluationRelations {
  // describe navigational properties here
}

export type EvaluationWithRelations = Evaluation & EvaluationRelations;
