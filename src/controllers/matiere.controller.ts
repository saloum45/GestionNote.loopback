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
import {Matiere} from '../models';
import {MatiereRepository} from '../repositories';

export class MatiereController {
  constructor(
    @repository(MatiereRepository)
    public matiereRepository : MatiereRepository,
  ) {}

  @post('/matieres')
  @response(200, {
    description: 'Matiere model instance',
    content: {'application/json': {schema: getModelSchemaRef(Matiere)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matiere, {
            title: 'NewMatiere',
            exclude: ['id'],
          }),
        },
      },
    })
    matiere: Omit<Matiere, 'id'>,
  ): Promise<Matiere> {
    return this.matiereRepository.create(matiere);
  }

  @get('/matieres/count')
  @response(200, {
    description: 'Matiere model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Matiere) where?: Where<Matiere>,
  ): Promise<Count> {
    return this.matiereRepository.count(where);
  }

  @get('/matieres')
  @response(200, {
    description: 'Array of Matiere model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Matiere, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Matiere) filter?: Filter<Matiere>,
  ): Promise<Matiere[]> {
    return this.matiereRepository.find(filter);
  }

  @patch('/matieres')
  @response(200, {
    description: 'Matiere PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matiere, {partial: true}),
        },
      },
    })
    matiere: Matiere,
    @param.where(Matiere) where?: Where<Matiere>,
  ): Promise<Count> {
    return this.matiereRepository.updateAll(matiere, where);
  }

  @get('/matieres/{id}')
  @response(200, {
    description: 'Matiere model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Matiere, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Matiere, {exclude: 'where'}) filter?: FilterExcludingWhere<Matiere>
  ): Promise<Matiere> {
    return this.matiereRepository.findById(id, filter);
  }

  @patch('/matieres/{id}')
  @response(204, {
    description: 'Matiere PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matiere, {partial: true}),
        },
      },
    })
    matiere: Matiere,
  ): Promise<void> {
    await this.matiereRepository.updateById(id, matiere);
  }

  @put('/matieres/{id}')
  @response(204, {
    description: 'Matiere PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() matiere: Matiere,
  ): Promise<void> {
    await this.matiereRepository.replaceById(id, matiere);
  }

  @del('/matieres/{id}')
  @response(204, {
    description: 'Matiere DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matiereRepository.deleteById(id);
  }
}
