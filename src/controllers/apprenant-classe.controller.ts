import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Apprenant,
  Classe,
} from '../models';
import {ApprenantRepository} from '../repositories';

export class ApprenantClasseController {
  constructor(
    @repository(ApprenantRepository)
    public apprenantRepository: ApprenantRepository,
  ) { }

  @get('/apprenants/{id}/classe', {
    responses: {
      '200': {
        description: 'Classe belonging to Apprenant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Classe),
          },
        },
      },
    },
  })
  async getClasse(
    @param.path.number('id') id: typeof Apprenant.prototype.id,
  ): Promise<Classe> {
    return this.apprenantRepository.classe_apprenant(id);
  }
}
