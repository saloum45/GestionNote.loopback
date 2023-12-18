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
  Professeur,
} from '../models';
import {ClasseRepository} from '../repositories';

export class ClasseProfesseurController {
  constructor(
    @repository(ClasseRepository) protected classeRepository: ClasseRepository,
  ) { }

  @get('/classes/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Array of Classe has many Professeur',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Professeur)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Professeur>,
  ): Promise<Professeur[]> {
    return this.classeRepository.professeurs(id).find(filter);
  }

  @post('/classes/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Classe model instance',
        content: {'application/json': {schema: getModelSchemaRef(Professeur)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Classe.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {
            title: 'NewProfesseurInClasse',
            exclude: ['id'],
            optional: ['classeId']
          }),
        },
      },
    }) professeur: Omit<Professeur, 'id'>,
  ): Promise<Professeur> {
    return this.classeRepository.professeurs(id).create(professeur);
  }

  @patch('/classes/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Classe.Professeur PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {partial: true}),
        },
      },
    })
    professeur: Partial<Professeur>,
    @param.query.object('where', getWhereSchemaFor(Professeur)) where?: Where<Professeur>,
  ): Promise<Count> {
    return this.classeRepository.professeurs(id).patch(professeur, where);
  }

  @del('/classes/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Classe.Professeur DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Professeur)) where?: Where<Professeur>,
  ): Promise<Count> {
    return this.classeRepository.professeurs(id).delete(where);
  }
}
