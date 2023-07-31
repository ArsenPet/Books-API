import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {books, BooksRelations} from '../models';

export class BooksRepository extends DefaultCrudRepository<
  books,
  typeof books.prototype.id,
  BooksRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(books, dataSource);
  }
}
