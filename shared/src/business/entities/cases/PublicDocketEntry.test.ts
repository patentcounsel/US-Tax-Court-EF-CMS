import { INITIAL_DOCUMENT_TYPES, PARTIES_CODES } from '../EntityConstants';
import { PublicDocketEntry } from './PublicDocketEntry';

describe('PublicDocketEntry', () => {
  it('should only have expected fields', () => {
    const entity = new PublicDocketEntry({
      additionalInfo: 'something',
      additionalInfo2: 'something else',
      anotherThing: false,
      attachments: true,
      certificateOfService: true,
      certificateOfServiceDate: '2018-06-07',
      createdAt: 'testing',
      docketEntryId: 'testing',
      docketNumber: '123-20',
      documentType: 'testing',
      eventCode: 'testing',
      filedBy: 'testing',
      isFileAttached: true,
      isLegacyServed: true,
      isPaper: true,
      lodged: true,
      objections: 'Yes',
      processingStatus: 'testing',
      receivedAt: 'testing',
      sealedTo: 'Public',
      servedAt: '2019-03-01T21:40:46.415Z',
      servedParties: [
        {
          email: 'jdirt@example.com',
          gsi1pk: 'shoot',
          name: 'Joe Dirt',
          phone: '555-555-1212',
          pk: 'oh no',
          sk: 'secondary',
        },
      ],
      servedPartiesCode: PARTIES_CODES.BOTH,
    });

    expect(entity.toRawObject()).toEqual({
      additionalInfo: 'something',
      additionalInfo2: 'something else',
      attachments: true,
      certificateOfService: true,
      certificateOfServiceDate: '2018-06-07',
      docketEntryId: 'testing',
      docketNumber: '123-20',
      documentTitle: undefined,
      documentType: 'testing',
      entityName: 'PublicDocketEntry',
      eventCode: 'testing',
      filedBy: 'testing',
      filingDate: undefined,
      freeText: undefined,
      index: undefined,
      isFileAttached: true,
      isLegacyServed: true,
      isMinuteEntry: undefined,
      isOnDocketRecord: undefined,
      isPaper: true,
      isSealed: false,
      isStricken: undefined,
      lodged: true,
      numberOfPages: undefined,
      objections: 'Yes',
      processingStatus: 'testing',
      receivedAt: 'testing',
      sealedTo: 'Public',
      servedAt: '2019-03-01T21:40:46.415Z',
      servedPartiesCode: 'B',
    });
  });

  describe('isOnDocketRecord', () => {
    describe('minute entries', () => {
      it('creates minute entry', () => {
        const docketEntry = new PublicDocketEntry({
          docketNumber: '101-21',
          documentType:
            INITIAL_DOCUMENT_TYPES.requestForPlaceOfTrial.documentType,
          eventCode: INITIAL_DOCUMENT_TYPES.requestForPlaceOfTrial.eventCode,
          filingDate: '2020-05-27T09:23:43.007Z',
          isMinuteEntry: true,
          isOnDocketRecord: true,
          receivedAt: '2020-05-27T09:23:43.007Z',
          userId: '02323349-87fe-4d29-91fe-8dd6916d2fda',
        });

        expect(docketEntry.isValid()).toBe(true);
      });
    });

    it('sets docket record related fields if a document is on the docket record', () => {
      const entity = new PublicDocketEntry({
        docketEntryId: 'e1d0b1c2-e531-4e07-ab82-851ee9acde64',
        docketNumber: '101-21',
        documentType:
          INITIAL_DOCUMENT_TYPES.requestForPlaceOfTrial.documentType,
        eventCode: INITIAL_DOCUMENT_TYPES.requestForPlaceOfTrial.eventCode,
        filedBy: 'testing',
        filingDate: '2020-05-27T09:23:43.007Z',
        index: 1,
        isMinuteEntry: true,
        isOnDocketRecord: true,
        isStricken: false,
        numberOfPages: null,
        receivedAt: '2020-05-27T09:23:43.007Z',
        userId: '02323349-87fe-4d29-91fe-8dd6916d2fda',
      });

      expect(entity.validate().toRawObject()).toMatchObject({
        docketEntryId: 'e1d0b1c2-e531-4e07-ab82-851ee9acde64',
        docketNumber: '101-21',
        documentType:
          INITIAL_DOCUMENT_TYPES.requestForPlaceOfTrial.documentType,
        filedBy: 'testing',
        filingDate: '2020-05-27T09:23:43.007Z',
        index: 1,
        isOnDocketRecord: true,
        isSealed: false,
        isStricken: false,
        receivedAt: '2020-05-27T09:23:43.007Z',
      });
    });
  });
});
