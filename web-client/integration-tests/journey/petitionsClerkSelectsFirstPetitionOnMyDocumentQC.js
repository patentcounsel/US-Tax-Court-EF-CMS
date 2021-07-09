export const petitionsClerkSelectsFirstPetitionOnMyDocumentQC =
  cerebralTest => {
    return it('Petitions clerk selects first petition on My Document QC', async () => {
      const workItem = test
        .getState('workQueue')
        .find(
          workItemInQueue =>
            workItemInQueue.docketNumber === cerebralTest.docketNumber,
        );

      const { docketEntryId } = workItem.docketEntry;

      cerebralTest.docketEntryId = docketEntryId;
    });
  };
