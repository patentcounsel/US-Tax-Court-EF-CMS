import { applicationContext } from '../../../../../shared/src/business/test/createTestApplicationContext';
import {
  updateIrsPractitionerOnCase,
  updatePrivatePractitionerOnCase,
} from './updatePractitionerOnCase';

describe('updatePractitionerOnCase', () => {
  let putStub;
  beforeEach(() => {
    putStub = jest.fn().mockReturnValue({
      promise: () => Promise.resolve(null),
    });

    applicationContext.getDocumentClient.mockReturnValue({
      put: putStub,
    });
  });

  describe('updateIrsPractitionerOnCase', () => {
    it('invokes the persistence layer with pk of docket number, sk of irsPractitioner and other practitioner data', async () => {
      await updateIrsPractitionerOnCase({
        applicationContext,
        docketNumber: '109-11',
        practitioner: { name: 'Someone' } as any,
        userId: '31487024-8377-46f9-a3ef-797fbf54734d',
      });

      expect(putStub.mock.calls[0][0].Item).toMatchObject({
        name: 'Someone',
        pk: 'case|109-11',
        sk: 'irsPractitioner|31487024-8377-46f9-a3ef-797fbf54734d',
      });
    });
  });

  describe('updatePrivatePractitionerOnCase', () => {
    it('invokes the persistence layer with pk of docket number, sk of irsPractitioner and other practitioner data', async () => {
      await updatePrivatePractitionerOnCase({
        applicationContext,
        docketNumber: '109-11',
        practitioner: { name: 'Someone else' } as any,
        userId: '31487024-8377-46f9-a3ef-797fbf54734d',
      });

      expect(putStub.mock.calls[0][0].Item).toMatchObject({
        name: 'Someone else',
        pk: 'case|109-11',
        sk: 'privatePractitioner|31487024-8377-46f9-a3ef-797fbf54734d',
      });
    });
  });
});
