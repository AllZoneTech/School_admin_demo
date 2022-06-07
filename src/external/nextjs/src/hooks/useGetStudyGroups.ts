import { fetchWrapper } from '@utils/fetchWrapper';
import { useQuery, UseQueryResult } from 'react-query';

export function getStudyGroups<TStudent>(): Promise<TStudent[]> {
  return fetchWrapper<TStudent[], undefined>({
    // url: `http://localhost:3000/study-groups`,
    url: `${process.env.API_BASE_URL}/study-groups`,
  });
}

export function useGetStudyGroups<TStudent>(): UseQueryResult<
  TStudent[] | undefined
> {
  return useQuery<TStudent[], Error>('getStudyGroups', getStudyGroups, {
    onError: () => {
      console.error('Error getting Study Groups');
    },
  });
}
