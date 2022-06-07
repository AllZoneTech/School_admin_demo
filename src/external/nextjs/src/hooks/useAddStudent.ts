import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { fetchWrapper } from '@utils/fetchWrapper';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface MutationVariables<TAddStudent> {
  studentID: number | TAddStudent;
  name: string | TAddStudent;
  sex: string | TAddStudent;
  email: string | TAddStudent;
  placeOfBirth: string | TAddStudent;
  dateOfBirth: string | TAddStudent;
}

async function createStudent<TAddStudent>({
  name,
  sex,
  email,
  placeOfBirth,
  dateOfBirth,
}: MutationVariables<TAddStudent>): Promise<unknown> {
  return await fetchWrapper<unknown, TAddStudent | any>({
    method: 'POST',
    url: `${process.env.API_BASE_URL}/students/`,
    // url: `http://localhost:3000/students/`,
    body: { name, sex, email, placeOfBirth, dateOfBirth },
  });
}

export function useAddStudent<TAddStudent>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TAddStudent>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TAddStudent>>(
    ({ studentID, name, sex, email, placeOfBirth, dateOfBirth }) =>
      createStudent<TAddStudent>({
        studentID,
        name,
        sex,
        email,
        placeOfBirth,
        dateOfBirth,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('students');
      },
      onError: () => {
        console.error('Error: Failed to create the student.');
      },
    }
  );
}
