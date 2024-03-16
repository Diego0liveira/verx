import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(14),
    producer_name: vine.string().trim().minLength(100),
    farm_name: vine.string().trim().minLength(100),
    city: vine.string().trim().minLength(100),
    state: vine.string().trim().minLength(100),
    country: vine.string().trim().minLength(100),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(14),
    producer_name: vine.string().trim().minLength(100),
    farm_name: vine.string().trim().minLength(100),
    city: vine.string().trim().minLength(100),
    state: vine.string().trim().minLength(100),
    country: vine.string().trim().minLength(100),
  })
)
