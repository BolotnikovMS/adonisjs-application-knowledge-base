import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programId: number

  @column()
  public questionId: number

  @column()
  public description: string

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
}
