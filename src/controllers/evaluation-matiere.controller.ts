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
  Matiere,
} from '../models';
import {EvaluationRepository} from '../repositories';

export class EvaluationMatiereController {
  constructor(
    @repository(EvaluationRepository)
    public evaluationRepository: EvaluationRepository,
  ) { }

  @get('/evaluations/{id}/matiere', {
    responses: {
      '200': {
        description: 'Matiere belonging to Evaluation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Matiere),
          },
        },
      },
    },
  })
  async getMatiere(
    @param.path.number('id') id: typeof Evaluation.prototype.id,
  ): Promise<Matiere> {
    return this.evaluationRepository.matiere_evaluation(id);
  }
}
