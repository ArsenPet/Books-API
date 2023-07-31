import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {books} from '../models';
import {BooksRepository} from '../repositories';

export class BooksController {
  constructor(
    @repository(BooksRepository)
    public booksRepository: BooksRepository,
  ) {}

  @post('/books')
  @response(200, {
    description: 'Books model instance',
    content: {'application/json': {schema: getModelSchemaRef(books)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(books, {
            title: 'NewBooks',
            exclude: ['id'],
          }),
        },
      },
    })
    books: Omit<books, 'id'>,
  ): Promise<books> {
    return this.booksRepository.create(books);
  }

  @get('/books/count')
  @response(200, {
    description: 'Books model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(books) where?: Where<books>): Promise<Count> {
    return this.booksRepository.count(where);
  }

  @get('/books')
  @response(200, {
    description: 'Array of Books model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(books, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(books) filter?: Filter<books>): Promise<books[]> {
    return this.booksRepository.find(filter);
  }

  @patch('/books')
  @response(200, {
    description: 'Books PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(books, {partial: true}),
        },
      },
    })
    books: books,
    @param.where(books) where?: Where<books>,
  ): Promise<Count> {
    return this.booksRepository.updateAll(books, where);
  }

  @get('/books/{id}')
  @response(200, {
    description: 'Books model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(books, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(books, {exclude: 'where'})
    filter?: FilterExcludingWhere<books>,
  ): Promise<books> {
    return this.booksRepository.findById(id, filter);
  }

  @patch('/books/{id}')
  @response(204, {
    description: 'Books PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(books, {partial: true}),
        },
      },
    })
    books: books,
  ): Promise<void> {
    await this.booksRepository.updateById(id, books);
  }

  @put('/books/{id}')
  @response(204, {
    description: 'Books PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() books: books,
  ): Promise<void> {
    await this.booksRepository.replaceById(id, books);
  }

  @del('/books/{id}')
  @response(204, {
    description: 'Books DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.booksRepository.deleteById(id);
  }
}
