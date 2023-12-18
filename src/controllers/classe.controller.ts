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
import {Classe} from '../models';
import {ClasseRepository} from '../repositories';

export class ClasseController {
  constructor(
    @repository(ClasseRepository)
    public classeRepository : ClasseRepository,
  ) {}

  @post('/classes')
  @response(200, {
    description: 'Classe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Classe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classe, {
            title: 'NewClasse',
            exclude: ['id'],
          }),
        },
      },
    })
    classe: Omit<Classe, 'id'>,
  ): Promise<Classe> {
    return this.classeRepository.create(classe);
  }

  @get('/classes/count')
  @response(200, {
    description: 'Classe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Classe) where?: Where<Classe>,
  ): Promise<Count> {
    return this.classeRepository.count(where);
  }

  @get('/classes')
  @response(200, {
    description: 'Array of Classe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Classe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Classe) filter?: Filter<Classe>,
  ): Promise<Classe[]> {
    return this.classeRepository.find(filter);
  }

  @patch('/classes')
  @response(200, {
    description: 'Classe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classe, {partial: true}),
        },
      },
    })
    classe: Classe,
    @param.where(Classe) where?: Where<Classe>,
  ): Promise<Count> {
    return this.classeRepository.updateAll(classe, where);
  }

  @get('/classes/{id}')
  @response(200, {
    description: 'Classe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Classe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Classe, {exclude: 'where'}) filter?: FilterExcludingWhere<Classe>
  ): Promise<Classe> {
    return this.classeRepository.findById(id, filter);
  }

  @patch('/classes/{id}')
  @response(204, {
    description: 'Classe PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Classe, {partial: true}),
        },
      },
    })
    classe: Classe,
  ): Promise<void> {
    await this.classeRepository.updateById(id, classe);
  }

  @put('/classes/{id}')
  @response(204, {
    description: 'Classe PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() classe: Classe,
  ): Promise<void> {
    await this.classeRepository.replaceById(id, classe);
  }

  @del('/classes/{id}')
  @response(204, {
    description: 'Classe DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.classeRepository.deleteById(id);
  }
}
