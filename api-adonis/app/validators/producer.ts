import vine, { SimpleMessagesProvider } from '@vinejs/vine'

/**
 * Validates if a given value is a valid CPF or CNPJ.
 *
 * @param value - The value to be validated.
 * @param options - Additional options for the validation.
 * @param field - The field being validated.
 */
const validCpfCnpj = vine.createRule(async (value: any, options: any, field: any) => {
  let isValidCpfCnpj: boolean = false

  if (value.length === 11) {
    isValidCpfCnpj = cpfValidator(value)
  } else if (value.length === 14) {
    isValidCpfCnpj = cnpjValidator(value)
  }

  if (!isValidCpfCnpj) {
    field.report(
      `O campo ${field} precisa ser um CPF ou CNPJ válido`,
      'incorrect-data-error',
      'document',
      'invalid'
    )
  }
})

/**
 * Validates the total area, arable area, and vegetation area of a farm.
 * If the sum of arable area and vegetation area is greater than the total area,
 * it reports a business error.
 *
 * @param value - The total area of the farm.
 * @param options - Additional options for the validation rule.
 * @param field - The field being validated.
 */
const validArea = vine.createRule(async (value: any, options: any, field: any) => {
  const totalArea = value
  const arableArea = field?.parent?.arableArea
  const vegetationArea = field?.parent?.vegetationArea

  if (totalArea && arableArea && vegetationArea) {
    const sum = arableArea + vegetationArea
    if (sum > totalArea) {
      field.report(
        'A soma de área agrícultável e vegetação, não pode ser maior que a área total da fazenda',
        'business-error',
        'arableArea',
        'invalid'
      )
    }
  }
})

/**
 * Validates a CNPJ (Cadastro Nacional da Pessoa Jurídica) number.
 * @param cnpj - The CNPJ number to validate.
 * @returns `true` if the CNPJ is valid, `false` otherwise.
 */
const cnpjValidator = (cnpj: string) => {
  if (!cnpj) return true

  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj === '') return false
  if (cnpj.length !== 14) return false

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return false

  let size = cnpj.length - 2
  let numbers = cnpj.substring(0, size)
  let digits = cnpj.substring(size)
  let sum = 0
  let pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number.parseInt(digits.charAt(0))) return false

  size = size + 1
  numbers = cnpj.substring(0, size)
  sum = 0
  pos = size - 7
  for (let i = size; i >= 1; i--) {
    sum += Number.parseInt(numbers.charAt(size - i)) * pos--
    if (pos < 2) pos = 9
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number.parseInt(digits.charAt(1))) return false

  return true
}

/**
 * Validates a CPF (Cadastro de Pessoas Físicas) number.
 * @param cpf - The CPF number to be validated.
 * @returns `true` if the CPF is valid, `false` otherwise.
 */
const cpfValidator = (cpf: string) => {
  if (!cpf || cpf === '') return true

  const validcpf = /^\d{11}$/
  if (!validcpf.test(cpf)) return false

  if (cpf === '00000000000') return false

  let sum: number = 0
  let rest: number
  let cpfArray = String(cpf).split('')

  cpfArray.forEach((item: string, index: number) => {
    if (index < 9) {
      sum += Number.parseInt(item) * (11 - (index + 1))
    }
  })
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== Number.parseFloat(cpfArray[9])) return false

  sum = 0

  cpfArray.forEach((item: string, index: number) => {
    if (index < 10) {
      sum += Number.parseInt(item) * (12 - (index + 1))
    }
  })
  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) {
    rest = 0
  }

  if (rest !== Number.parseFloat(cpfArray[10])) return false

  return true
}

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'O campo {{ field }} é obrigatório',
  minLength: 'O campo {{ field }} precisa ter no mínimo {{ min }} caracteres',
  maxLength: 'O campo {{ field }} precisa ter no máximo {{ max }} caracteres',
  min: 'O campo {{ field }} precisa ser no mínimo {{ min }}',
  max: 'O campo {{ field }} precisa ser no máximo {{ max }}',
  string: 'O campo {{ field }} precisa ser uma string',
  number: 'O campo {{ field }} precisa ser um número',
})

export const createOrUpdatePostValidator = vine.compile(
  vine.object({
    document: vine.string().trim().minLength(11).maxLength(14).use(validCpfCnpj()),
    producerName: vine.string().trim().maxLength(100),
    farmName: vine.string().trim().maxLength(100),
    totalArea: vine.number().min(0).use(validArea()),
    arableArea: vine.number().min(0),
    vegetationArea: vine.number().min(0),
    locationCityId: vine.number().min(1),
  })
)
