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
import {Evaluation} from '../models';
import {EvaluationRepository} from '../repositories';

export class EvaluationController {
  constructor(
    @repository(EvaluationRepository)
    public evaluationRepository : EvaluationRepository,
  ) {}

  @post('/evaluations')
  @response(200, {
    description: 'Evaluation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Evaluation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluation, {
            title: 'NewEvaluation',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluation: Omit<Evaluation, 'id'>,
  ): Promise<Evaluation> {
    return this.evaluationRepository.create(evaluation);
  }

  @get('/evaluations/count')
  @response(200, {
    description: 'Evaluation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Evaluation) where?: Where<Evaluation>,
  ): Promise<Count> {
    return this.evaluationRepository.count(where);
  }

  @get('/evaluations')
  @response(200, {
    description: 'Array of Evaluation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Evaluation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Evaluation) filter?: Filter<Evaluation>,
  ): Promise<Evaluation[]> {
    return this.evaluationRepository.find(filter);
  }

  @patch('/evaluations')
  @response(200, {
    description: 'Evaluation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluation, {partial: true}),
        },
      },
    })
    evaluation: Evaluation,
    @param.where(Evaluation) where?: Where<Evaluation>,
  ): Promise<Count> {
    return this.evaluationRepository.updateAll(evaluation, where);
  }

  @get('/evaluations/{id}')
  @response(200, {
    description: 'Evaluation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Evaluation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Evaluation, {exclude: 'where'}) filter?: FilterExcludingWhere<Evaluation>
  ): Promise<Evaluation> {
    return this.evaluationRepository.findById(id, filter);
  }

  @patch('/evaluations/{id}')
  @response(204, {
    description: 'Evaluation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Evaluation, {partial: true}),
        },
      },
    })
    evaluation: Evaluation,
  ): Promise<void> {
    await this.evaluationRepository.updateById(id, evaluation);
  }

  @put('/evaluations/{id}')
  @response(204, {
    description: 'Evaluation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluation: Evaluation,
  ): Promise<void> {
    await this.evaluationRepository.replaceById(id, evaluation);
  }

  @del('/evaluations/{id}')
  @response(204, {
    description: 'Evaluation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluationRepository.deleteById(id);
  }
}
