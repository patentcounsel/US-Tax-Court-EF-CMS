/**
 * returns a formatted scan mode label based on the scanMode value
 *
 * @param {object} providers the providers object
 * @param {Function} providers.scanMode the scan mode
 * @returns {string} the prettified scan mode label
 *
 */

export default (applicationContext, scanMode) => {
  const { SCAN_MODES } = applicationContext.getConstants();
  let scanModeLabel = '';

  switch (scanMode) {
    case SCAN_MODES.FEEDER:
      scanModeLabel = 'Single sided';
      break;
    case SCAN_MODES.FLATBED:
      scanModeLabel = 'Flatbed';
      break;
    case SCAN_MODES.DUPLEX:
      scanModeLabel = 'Double sided';
  }
  return scanModeLabel;
};
