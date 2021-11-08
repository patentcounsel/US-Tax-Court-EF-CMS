const { get } = require('lodash');
const { getCurrentInvoke } = require('@vendia/serverless-express');

export const lambdaWrapper = lambda => {
  return async (req, res) => {
    const currentInvoke = getCurrentInvoke();
    // If you'd like to test the terminal user functionality locally, make this boolean true
    let isTerminalUser =
      get(currentInvoke, 'event.requestContext.authorizer.isTerminalUser') ===
      'true';

    const event = {
      headers: req.headers,
      isTerminalUser,
      path: req.path,
      pathParameters: req.params,
      queryStringParameters: req.query,
    };

    setTimeout(() => {
      return res.status(504).send('Request timed out.');
    }, 20 * 60 * 1000); // 20 minute timeout (for async lambdas)

    const response = await lambda({
      ...event,
      body: JSON.stringify(req.body),
      logger: req.locals.logger,
    });

    res.status(response.statusCode);

    res.set({
      'Access-Control-Allow-Origin': '*',
      'Cache-Control':
        'max-age=0, private, no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
      Pragma: 'no-cache',
      Vary: 'Authorization',
      'X-Content-Type-Options': 'nosniff',
      'X-Terminal-User': isTerminalUser,
    });

    if (
      ['application/pdf', 'text/html'].includes(
        response.headers['Content-Type'],
      )
    ) {
      res.set('Content-Type', response.headers['Content-Type']);
      res.send(response.body);
    } else if (response.headers['Content-Type'] === 'application/json') {
      res.send(JSON.parse(response.body || 'null'));
    } else if (response.headers.Location) {
      res.redirect(response.headers.Location);
    } else {
      console.log('ERROR: we do not support this return type');
    }
  };
};
