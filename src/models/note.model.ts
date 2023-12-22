import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evaluation} from './evaluation.model';
import {Apprenant} from './apprenant.model';

@model()
export class Note extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  note: number;

  @belongsTo(() => Evaluation, {name: 'evalutaion_note'})
  evaluationId: number;

  @belongsTo(() => Apprenant, {name: 'apprenant_note'})
  apprenantId: number;

  constructor(data?: Partial<Note>) {
    super(data);
  }
}

export interface NoteRelations {
  // describe navigational properties here
}

export type NoteWithRelations = Note & NoteRelations;
