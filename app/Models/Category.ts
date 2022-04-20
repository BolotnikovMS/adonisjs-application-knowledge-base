import { DateTime } from 'luxon'
import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'

import Question from 'App/Models/Question'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public working_direction_id: number

  @column()
  public name: string

  @column()
  public description: null

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

  @hasMany(() => Question, {
    foreignKey: 'category_id',
    localKey: 'id'
  })
  public questions: HasMany<typeof Question>
}
