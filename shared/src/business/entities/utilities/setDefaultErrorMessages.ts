const joiErrorKeys = [
  'any.type',
  'any.allow',
  'any.alter',
  'any.artifact',
  'any.cache',
  'any.cast',
  'any.concat',
  'any.custom',
  'any.default',
  'any.describe',
  'any.description',
  'any.empty',
  'any.error',
  'any.example',
  'any.external',
  'any.extract',
  'any.failover',
  'any.forbidden',
  'any.fork',
  'any.id',
  'any.invalid',
  'any.keep',
  'any.label',
  'any.message',
  'any.messages',
  'any.meta',
  'any.note',
  'any.only',
  'any.optional',
  'any.prefs',
  'any.presence',
  'any.raw',
  'any.required',
  'any.result',
  'any.rule',
  'any.ruleset',
  'any.shared',
  'any.strict',
  'any.strip',
  'any.tag',
  'any.tailor',
  'any.unit',
  'any.valid',
  'any.validate',
  'any.validateAsync',
  'any.warn',
  'any.warning',
  'any.when',
  'alternatives.conditional',
  'alternatives.match',
  'alternatives.try',
  'array.has',
  'array.items',
  'array.length',
  'array.max',
  'array.min',
  'array.ordered',
  'array.single',
  'array.sort',
  'array.sparse',
  'array.unique',
  'binary.encoding',
  'binary.length',
  'binary.max',
  'binary.min',
  'boolean.falsy',
  'boolean.sensitive',
  'boolean.truthy',
  'date.greater',
  'date.iso',
  'date.less',
  'date.max',
  'date.min',
  'date.timestamp',
  'function.arity',
  'link.ref',
  'link.concat',
  'number.greater',
  'number.integer',
  'number.less',
  'number.max',
  'number.min',
  'number.multiple',
  'number.negative',
  'number.port',
  'number.positive',
  'number.precision',
  'number.sign',
  'number.unsafe',
  'object.and',
  'object.append',
  'object.assert',
  'object.instance',
  'object.keys',
  'object.length',
  'object.max',
  'object.min',
  'object.nand',
  'object.or',
  'object.oxor',
  'object.pattern',
  'object.ref',
  'object.regex',
  'object.rename',
  'object.schema',
  'object.unknown',
  'object.with',
  'object.without',
  'object.xor',
  'string.alphanum',
  'string.base64',
  'string.case',
  'string.creditCard',
  'string.dataUri',
  'string.domain',
  'string.email',
  'string.guid',
  'string.hex',
  'string.hostname',
  'string.insensitive',
  'string.ip',
  'string.isoDate',
  'string.isoDuration',
  'string.length',
  'string.lowercase',
  'string.max',
  'string.min',
  'string.normalize',
  'string.pattern',
  'string.replace',
  'string.token',
  'string.trim',
  'string.truncate',
  'string.uppercase',
  'string.uri',
  'symbol.map',
  'alternatives.all',
  'alternatives.any',
  'alternatives.match',
  'alternatives.one',
  'alternatives.types',
  'any.custom',
  'any.default',
  'any.failover',
  'any.invalid',
  'any.only',
  'any.ref',
  'any.required',
  'any.unknown',
  'array.base',
  'array.excludes',
  'array.includesRequiredBoth',
  'array.includesRequiredKnowns',
  'array.includesRequiredUnknowns',
  'array.includes',
  'array.length',
  'array.max',
  'array.min',
  'array.orderedLength',
  'array.sort',
  'array.sort',
  'array.sort',
  'array.sparse',
  'array.unique',
  'array.hasKnown',
  'array.hasUnknown',
  'binary.base',
  'binary.length',
  'binary.max',
  'binary.min',
  'boolean.base',
  'date.base',
  'date.format',
  'date.greater',
  'date.less',
  'date.max',
  'date.min',
  'date.strict',
  'function.arity',
  'function.class',
  'function.maxArity',
  'function.minArity',
  'number.base',
  'number.greater',
  'number.infinity',
  'number.integer',
  'number.less',
  'number.max',
  'number.min',
  'number.multiple',
  'number.negative',
  'number.port',
  'number.positive',
  'number.precision',
  'number.unsafe',
  'object.unknown',
  'object.and',
  'object.assert',
  'object.base',
  'object.length',
  'object.max',
  'object.min',
  'object.missing',
  'object.nand',
  'object.pattern',
  'object.refType',
  'object.regex',
  'object.rename',
  'object.rename',
  'object.schema',
  'object.instance',
  'object.with',
  'object.without',
  'object.xor',
  'object.oxor',
  'string.alphanum',
  'string.base64',
  'string.base',
  'string.creditCard',
  'string.dataUri',
  'string.domain',
  'string.email',
  'string.empty',
  'string.guid',
  'string.hexAlign',
  'string.hex',
  'string.hostname',
  'string.ipVersion',
  'string.ip',
  'string.isoDate',
  'string.isoDuration',
  'string.length',
  'string.lowercase',
  'string.max',
  'string.min',
  'string.normalize',
  'string.pattern',
  'string.pattern',
  'string.pattern',
  'string.pattern',
  'string.token',
  'string.trim',
  'string.uppercase',
  'string.uri',
  'string.uriCustomScheme',
  'string.uriRelativeOnly',
  'symbol.base',
  'symbol.map',
];

type ErrorMessageOptions = {
  type?: string;
  keysToIgnore?: string[];
};

export function setDefaultErrorMessages(
  message: string,
  options?: ErrorMessageOptions,
): {
  [key: string]: string;
} {
  const defaultErrorMessages = {};
  const joiKeysToUse = joiErrorKeys
    .filter(key => {
      if (options?.type) return key.includes(options.type);
      return true;
    })
    .filter(key => {
      if (options?.keysToIgnore) return !options.keysToIgnore.includes(key);
      return true;
    });

  joiKeysToUse.forEach(key => {
    defaultErrorMessages[key] = message;
  });
  return defaultErrorMessages;
}
