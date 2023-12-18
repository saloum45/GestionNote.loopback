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
import {Professeur} from '../models';
import {ProfesseurRepository} from '../repositories';

export class ProfesseurController {
  constructor(
    @repository(ProfesseurRepository)
    public professeurRepository : ProfesseurRepository,
  ) {}

  @post('/professeurs')
  @response(200, {
    description: 'Professeur model instance',
    content: {'application/json': {schema: getModelSchemaRef(Professeur)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {
            title: 'NewProfesseur',
            exclude: ['id'],
          }),
        },
      },
    })
    professeur: Omit<Professeur, 'id'>,
  ): Promise<Professeur> {
    return this.professeurRepository.create(professeur);
  }

  @get('/professeurs/count')
  @response(200, {
    description: 'Professeur model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Professeur) where?: Where<Professeur>,
  ): Promise<Count> {
    return this.professeurRepository.count(where);
  }

  @get('/professeurs')
  @response(200, {
    description: 'Array of Professeur model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Professeur, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Professeur) filter?: Filter<Professeur>,
  ): Promise<Professeur[]> {
    return this.professeurRepository.find(filter);
  }

  @patch('/professeurs')
  @response(200, {
    description: 'Professeur PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {partial: true}),
        },
      },
    })
    professeur: Professeur,
    @param.where(Professeur) where?: Where<Professeur>,
  ): Promise<Count> {
    return this.professeurRepository.updateAll(professeur, where);
  }

  @get('/professeurs/{id}')
  @response(200, {
    description: 'Professeur model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Professeur, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Professeur, {exclude: 'where'}) filter?: FilterExcludingWhere<Professeur>
  ): Promise<Professeur> {
    return this.professeurRepository.findById(id, filter);
  }

  @patch('/professeurs/{id}')
  @response(204, {
    description: 'Professeur PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {partial: true}),
        },
      },
    })
    professeur: Professeur,
  ): Promise<void> {
    await this.professeurRepository.updateById(id, professeur);
  }

  @put('/professeurs/{id}')
  @response(204, {
    description: 'Professeur PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() professeur: Professeur,
  ): Promise<void> {
    await this.professeurRepository.replaceById(id, professeur);
  }

  @del('/professeurs/{id}')
  @response(204, {
    description: 'Professeur DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.professeurRepository.deleteById(id);
  }
}
