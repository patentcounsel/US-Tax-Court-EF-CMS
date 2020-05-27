const joi = require('@hapi/joi');
const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');
const { getTimestampSchema } = require('../../utilities/dateSchema');

const joiStrictTimestamp = getTimestampSchema();

/**
 * Statistic constructor
 *
 * @param {object} rawStatistic the raw statistic data
 * @constructor
 */
function Statistic(rawStatistic) {
  this.entityName = 'Statistic';

  this.determinationDeficiencyAmount =
    rawStatistic.determinationDeficiencyAmount;
  this.determinationTotalPenalties = rawStatistic.determinationTotalPenalties;
  this.irsDeficiencyAmount = rawStatistic.irsDeficiencyAmount;
  this.irsTotalPenalties = rawStatistic.irsTotalPenalties;
  this.lastDateOfPeriod = rawStatistic.lastDateOfPeriod;
  this.year = rawStatistic.year;
  this.yearOrPeriod = rawStatistic.yearOrPeriod;
}

Statistic.validationName = 'Statistic';

Statistic.VALIDATION_ERROR_MESSAGES = {
  determinationDeficiencyAmount: 'Enter deficiency on Determination',
  determinationTotalPenalties: 'Enter total penalties on Determination',
  irsDeficiencyAmount: 'Enter deficiency on IRS Notice',
  irsTotalPenalties: 'Enter total penalties on IRS Notice',
  lastDateOfPeriod: [
    {
      contains: 'must be less than or equal to',
      message: 'Enter a valid last date of period',
    },
    'Last date of period is required',
  ],
  year: 'Enter year',
};

joiValidationDecorator(
  Statistic,
  joi.object().keys({
    determinationDeficiencyAmount: joi
      .alternatives()
      .conditional('determinationTotalPenalties', {
        is: joi.exist().not(null),
        otherwise: joi.number().optional().allow(null),
        then: joi.number().required(),
      })
      .description('The amount of the deficiency determined by the Court.'),
    determinationTotalPenalties: joi
      .alternatives()
      .conditional('determinationDeficiencyAmount', {
        is: joi.exist().not(null),
        otherwise: joi.number().optional().allow(null),
        then: joi.number().required(),
      })
      .description(
        'The total amount of penalties for the period or year determined by the Court.',
      ),
    entityName: joi.string().valid('Statistic').required(),
    irsDeficiencyAmount: joi
      .number()
      .required()
      .description('The amount of the deficiency on the IRS notice.'),
    irsTotalPenalties: joi
      .number()
      .required()
      .description(
        'The total amount of penalties for the period or year on the IRS notice.',
      ),
    lastDateOfPeriod: joi
      .when('yearOrPeriod', {
        is: 'Period',
        otherwise: joi.optional().allow(null),
        then: joiStrictTimestamp.max('now').required(),
      })
      .description('Last date of the statistics period.'),
    year: joi
      .when('yearOrPeriod', {
        is: 'Year',
        otherwise: joi.optional().allow(null),
        then: joi
          .number()
          .integer()
          .required()
          .min(1900)
          .max(new Date().getFullYear()),
      })
      .description('The year of the statistics period.'),
    yearOrPeriod: joi
      .string()
      .required()
      .valid('Year', 'Period')
      .description('Whether the statistics are for a year or period.'),
  }),
  Statistic.VALIDATION_ERROR_MESSAGES,
);

module.exports = { Statistic };
