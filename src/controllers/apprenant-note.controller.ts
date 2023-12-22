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
  Apprenant,
  Note,
} from '../models';
import {ApprenantRepository} from '../repositories';

export class ApprenantNoteController {
  constructor(
    @repository(ApprenantRepository) protected apprenantRepository: ApprenantRepository,
  ) { }

  @get('/apprenants/{id}/notes', {
    responses: {
      '200': {
        description: 'Array of Apprenant has many Note',
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
    return this.apprenantRepository.notes(id).find(filter);
  }

  @post('/apprenants/{id}/notes', {
    responses: {
      '200': {
        description: 'Apprenant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Note)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Apprenant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {
            title: 'NewNoteInApprenant',
            exclude: ['id'],
            optional: ['apprenantId']
          }),
        },
      },
    }) note: Omit<Note, 'id'>,
  ): Promise<Note> {
    return this.apprenantRepository.notes(id).create(note);
  }

  @patch('/apprenants/{id}/notes', {
    responses: {
      '200': {
        description: 'Apprenant.Note PATCH success count',
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
    return this.apprenantRepository.notes(id).patch(note, where);
  }

  @del('/apprenants/{id}/notes', {
    responses: {
      '200': {
        description: 'Apprenant.Note DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Note)) where?: Where<Note>,
  ): Promise<Count> {
    return this.apprenantRepository.notes(id).delete(where);
  }
}
