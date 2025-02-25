import { state } from '@web-client/presenter/app.cerebral';

export const createOrderAction = ({ applicationContext, get }: ActionProps) => {
  let richText = get(state.form.richText) || '';
  let documentTitle = (get(state.form.documentTitle) || '').toUpperCase();
  richText = richText.replace(
    /\t/g,
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
  );

  const isOrderEvent = get(state.form.eventCode) == 'NOT'; // 'NOT' === 'notice'
  let signatureForNotice = '';
  if (isOrderEvent) {
    signatureForNotice = applicationContext.getClerkOfCourtNameForSigning();
  }

  return {
    contentHtml: richText,
    documentTitle,
    signatureText: signatureForNotice,
  };
};
