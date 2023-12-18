import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',
    required: true,
  })
  classeId: number;

  @property({
    type: 'number',
    required: true,
  })
  matiereId: number;


  constructor(data?: Partial<Evaluation>) {
    super(data);
  }
}

export interface EvaluationRelations {
  // describe navigational properties here
}

export type EvaluationWithRelations = Evaluation & EvaluationRelations;
