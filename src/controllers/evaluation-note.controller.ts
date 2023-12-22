import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Evaluation,
  Note,
} from '../models';
import {EvaluationRepository} from '../repositories';

export class EvaluationNoteController {
  constructor(
    @repository(EvaluationRepository) protected evaluationRepository: EvaluationRepository,
  ) { }

  @get('/evaluations/{id}/notes', {
    responses: {
      '200': {
        description: 'Array of Evaluation has many Note',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Note)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Note>,
  ): Promise<Note[]> {
    return this.evaluationRepository.notes(id).find(filter);
  }

  @post('/evaluations/{id}/notes', {
    responses: {
      '200': {
        description: 'Evaluation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Note)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Evaluation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {
            title: 'NewNoteInEvaluation',
            exclude: ['id'],
            optional: ['evaluationId']
          }),
        },
      },
    }) note: Omit<Note, 'id'>,
  ): Promise<Note> {
    return this.evaluationRepository.notes(id).create(note);
  }

  @patch('/evaluations/{id}/notes', {
    responses: {
      '200': {
        description: 'Evaluation.Note PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {partial: true}),
        },
      },
    })
    note: Partial<Note>,
    @param.query.object('where', getWhereSchemaFor(Note)) where?: Where<Note>,
  ): Promise<Count> {
    return this.evaluationRepository.notes(id).patch(note, where);
  }

  @del('/evaluations/{id}/notes', {
    responses: {
      '200': {
        description: 'Evaluation.Note DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Note)) where?: Where<Note>,
  ): Promise<Count> {
    return this.evaluationRepository.notes(id).delete(where);
  }
}
