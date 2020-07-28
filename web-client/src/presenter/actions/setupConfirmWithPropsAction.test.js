import { runAction } from 'cerebral/test';
import { setupConfirmWithPropsAction } from './setupConfirmWithPropsAction';

describe('setupConfirmWithPropsAction', () => {
  it('sets up confirmation with props', async () => {
    const result = await runAction(setupConfirmWithPropsAction, {
      state: {
        modal: {
          docketNumber: 'abc-123',
          documentIdToEdit: 'abc-123',
          parentMessageId: '987',
        },
        redirectUrl: 'www.example.com',
      },
    });

    expect(result.output).toMatchObject({
      docketNumber: 'abc-123',
      documentIdToEdit: 'abc-123',
      parentMessageId: '987',
      redirectUrl: 'www.example.com',
    });
  });
});
