import { get } from '../requests';

export const getUsersInSectionInteractor = (
  applicationContext,
  { section }: { section: string },
): Promise<RawUser[]> => {
  return get({
    applicationContext,
    endpoint: `/sections/${section}/users`,
  });
};
