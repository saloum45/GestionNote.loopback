import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Evaluation,
  Classe,
} from '../models';
import {EvaluationRepository} from '../repositories';

export class EvaluationClasseController {
  constructor(
    @repository(EvaluationRepository)
    public evaluationRepository: EvaluationRepository,
  ) { }

  @get('/evaluations/{id}/classe', {
    responses: {
      '200': {
        description: 'Classe belonging to Evaluation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Classe),
          },
        },
      },
    },
  })
  async getClasse(
    @param.path.number('id') id: typeof Evaluation.prototype.id,
  ): Promise<Classe> {
    return this.evaluationRepository.classe_evaluation(id);
  }
}
