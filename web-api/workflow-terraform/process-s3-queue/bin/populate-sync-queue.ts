import { addToQueue } from '../../../../shared/admin-tools/aws/sqsHelper';
import { generateBucketSyncQueueEntries } from '../main/utilities/generate-sync-queue';

const sourceBucket = process.env.SOURCE_BUCKET_NAME;
const destinationBucket = process.env.DESTINATION_BUCKET_NAME;
const QueueUrl = process.env.S3_BUCKET_QUEUE_URL;

(async () => {
  const messages = await generateBucketSyncQueueEntries({
    destinationBucket,
    sourceBucket,
  });
  await addToQueue({ QueueUrl, messages });
})();
