import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Article from 'App/Models/Article'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programId: number

  @column()
  public description_question: string

  @column.dateTime({
    autoCreate: true,
    serialize: (value?: DateTime) => {
      return value ? value.toFormat('HH:mm dd.MM.yyyy') : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value?: DateTime) => {
      return value ? value.toFormat('HH:mm dd.MM.yyyy') : value
    },
  })
  public updatedAt: DateTime

  @hasMany(() => Article, {
    foreignKey: 'questionId',
    localKey: 'id',
  })
  public articles: HasMany<typeof Article>
}
