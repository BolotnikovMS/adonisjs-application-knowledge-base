import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public question: string

  @column()
  public description_question: string

  @column()
  public status: string

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
}
