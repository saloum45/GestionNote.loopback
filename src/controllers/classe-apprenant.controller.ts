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
  Classe,
  Apprenant,
} from '../models';
import {ClasseRepository} from '../repositories';

export class ClasseApprenantController {
  constructor(
    @repository(ClasseRepository) protected classeRepository: ClasseRepository,
  ) { }

  @get('/classes/{id}/apprenants', {
    responses: {
      '200': {
        description: 'Array of Classe has many Apprenant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apprenant)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Apprenant>,
  ): Promise<Apprenant[]> {
    return this.classeRepository.apprenants(id).find(filter);
  }

  @post('/classes/{id}/apprenants', {
    responses: {
      '200': {
        description: 'Classe model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apprenant)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Classe.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apprenant, {
            title: 'NewApprenantInClasse',
            exclude: ['id'],
            optional: ['classeId']
          }),
        },
      },
    }) apprenant: Omit<Apprenant, 'id'>,
  ): Promise<Apprenant> {
    return this.classeRepository.apprenants(id).create(apprenant);
  }

  @patch('/classes/{id}/apprenants', {
    responses: {
      '200': {
        description: 'Classe.Apprenant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apprenant, {partial: true}),
        },
      },
    })
    apprenant: Partial<Apprenant>,
    @param.query.object('where', getWhereSchemaFor(Apprenant)) where?: Where<Apprenant>,
  ): Promise<Count> {
    return this.classeRepository.apprenants(id).patch(apprenant, where);
  }

  @del('/classes/{id}/apprenants', {
    responses: {
      '200': {
        description: 'Classe.Apprenant DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Apprenant)) where?: Where<Apprenant>,
  ): Promise<Count> {
    return this.classeRepository.apprenants(id).delete(where);
  }
}
