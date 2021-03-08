import { runAction } from 'cerebral/test';
import { setIsScanningFalseAction } from './setIsScanningFalseAction';

describe('setIsScanningFalseAction', () => {
  it('should set state.scanner.isScanning to false', async () => {
    const { state } = await runAction(setIsScanningFalseAction, {
      state: {
        scanner: {
          isScanning: true,
        },
      },
    });

    expect(state.scanner.isScanning).toBeFalsy();
  });
});
