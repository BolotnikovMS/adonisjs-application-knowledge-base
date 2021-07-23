import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Article from 'App/Models/Article'
import Document from 'App/Models/Document'

export default class ProgramList extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: null

  @column()
  public site: string

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return value ? value.toFormat('HH:mm dd.MM.yyyy') : value
    }
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value?: DateTime) => {
      return value ? value.toFormat('HH:mm dd.MM.yyyy') : value
    }
  })
  public updatedAt: DateTime

  @hasMany(() => Article, {
    foreignKey: 'programId',
    localKey: 'id'
  })
  public articles: HasMany<typeof Article>

  @hasMany(() => Document, {
    foreignKey: 'programId',
    localKey: 'id'
  })
  public documents: HasMany<typeof Document>


}
