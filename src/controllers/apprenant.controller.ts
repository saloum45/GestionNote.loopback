import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Apprenant} from '../models';
import {ApprenantRepository} from '../repositories';

export class ApprenantController {
  constructor(
    @repository(ApprenantRepository)
    public apprenantRepository : ApprenantRepository,
  ) {}

  @post('/apprenants')
  @response(200, {
    description: 'Apprenant model instance',
    content: {'application/json': {schema: getModelSchemaRef(Apprenant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apprenant, {
            title: 'NewApprenant',
            exclude: ['id'],
          }),
        },
      },
    })
    apprenant: Omit<Apprenant, 'id'>,
  ): Promise<Apprenant> {
    return this.apprenantRepository.create(apprenant);
  }

  @get('/apprenants/count')
  @response(200, {
    description: 'Apprenant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Apprenant) where?: Where<Apprenant>,
  ): Promise<Count> {
    return this.apprenantRepository.count(where);
  }

  @get('/apprenants')
  @response(200, {
    description: 'Array of Apprenant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Apprenant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Apprenant) filter?: Filter<Apprenant>,
  ): Promise<Apprenant[]> {
    return this.apprenantRepository.find(filter);
  }

  @patch('/apprenants')
  @response(200, {
    description: 'Apprenant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apprenant, {partial: true}),
        },
      },
    })
    apprenant: Apprenant,
    @param.where(Apprenant) where?: Where<Apprenant>,
  ): Promise<Count> {
    return this.apprenantRepository.updateAll(apprenant, where);
  }

  @get('/apprenants/{id}')
  @response(200, {
    description: 'Apprenant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Apprenant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Apprenant, {exclude: 'where'}) filter?: FilterExcludingWhere<Apprenant>
  ): Promise<Apprenant> {
    return this.apprenantRepository.findById(id, filter);
  }

  @patch('/apprenants/{id}')
  @response(204, {
    description: 'Apprenant PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apprenant, {partial: true}),
        },
      },
    })
    apprenant: Apprenant,
  ): Promise<void> {
    await this.apprenantRepository.updateById(id, apprenant);
  }

  @put('/apprenants/{id}')
  @response(204, {
    description: 'Apprenant PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apprenant: Apprenant,
  ): Promise<void> {
    await this.apprenantRepository.replaceById(id, apprenant);
  }

  @del('/apprenants/{id}')
  @response(204, {
    description: 'Apprenant DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apprenantRepository.deleteById(id);
  }
}
