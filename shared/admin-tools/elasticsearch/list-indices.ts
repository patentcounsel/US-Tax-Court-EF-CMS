import { esAliasType } from '../../../web-api/elasticsearch/elasticsearch-aliases';
import { getClient } from '../../../web-api/elasticsearch/client';
import { requireEnvVars } from '../util';

requireEnvVars(['ENV', 'ELASTICSEARCH_ENDPOINT']);

(async () => {
  const environmentName = process.env.ENV!;
  const elasticsearchEndpoint = process.env.ELASTICSEARCH_ENDPOINT!;

  const client = await getClient({ elasticsearchEndpoint, environmentName });
  const stats = await client.indices.stats({
    index: '_all',
    level: 'indices',
  });
  const counts = {};
  for (const index in stats.body?.indices) {
    const count = await client.count({ index });
    counts[index] = Number(count.body?.count || 0);
  }
  const aliases = {};
  (await client.cat.aliases({ format: 'json' })).body?.map((a: esAliasType) => {
    aliases[a.alias] = a.index;
  });
  console.log('indices:', counts);
  console.log('aliases:', aliases);
})();
