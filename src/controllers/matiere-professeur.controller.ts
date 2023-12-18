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
  Matiere,
  Professeur,
} from '../models';
import {MatiereRepository} from '../repositories';

export class MatiereProfesseurController {
  constructor(
    @repository(MatiereRepository) protected matiereRepository: MatiereRepository,
  ) { }

  @get('/matieres/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Array of Matiere has many Professeur',
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
    return this.matiereRepository.professeurs(id).find(filter);
  }

  @post('/matieres/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Matiere model instance',
        content: {'application/json': {schema: getModelSchemaRef(Professeur)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Matiere.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professeur, {
            title: 'NewProfesseurInMatiere',
            exclude: ['id'],
            optional: ['matiereId']
          }),
        },
      },
    }) professeur: Omit<Professeur, 'id'>,
  ): Promise<Professeur> {
    return this.matiereRepository.professeurs(id).create(professeur);
  }

  @patch('/matieres/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Matiere.Professeur PATCH success count',
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
    return this.matiereRepository.professeurs(id).patch(professeur, where);
  }

  @del('/matieres/{id}/professeurs', {
    responses: {
      '200': {
        description: 'Matiere.Professeur DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Professeur)) where?: Where<Professeur>,
  ): Promise<Count> {
    return this.matiereRepository.professeurs(id).delete(where);
  }
}
