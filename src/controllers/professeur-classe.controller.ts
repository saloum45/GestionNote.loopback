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
  Classe,
} from '../models';
import {ProfesseurRepository} from '../repositories';

export class ProfesseurClasseController {
  constructor(
    @repository(ProfesseurRepository)
    public professeurRepository: ProfesseurRepository,
  ) { }

  @get('/professeurs/{id}/classe', {
    responses: {
      '200': {
        description: 'Classe belonging to Professeur',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Classe),
          },
        },
      },
    },
  })
  async getClasse(
    @param.path.number('id') id: typeof Professeur.prototype.id,
  ): Promise<Classe> {
    return this.professeurRepository.classe_professeur(id);
  }
}
