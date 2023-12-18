import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Professeur,
  Matiere,
} from '../models';
import {ProfesseurRepository} from '../repositories';

export class ProfesseurMatiereController {
  constructor(
    @repository(ProfesseurRepository)
    public professeurRepository: ProfesseurRepository,
  ) { }

  @get('/professeurs/{id}/matiere', {
    responses: {
      '200': {
        description: 'Matiere belonging to Professeur',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Matiere),
          },
        },
      },
    },
  })
  async getMatiere(
    @param.path.number('id') id: typeof Professeur.prototype.id,
  ): Promise<Matiere> {
    return this.professeurRepository.matiere_professeur(id);
  }
}
