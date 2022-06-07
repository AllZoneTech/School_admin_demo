import { fetchWrapper } from '@utils/fetchWrapper';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

interface MutationVariables<TStudentValues> {
  studentID: number | TStudentValues;
  name: string | TStudentValues;
  sex: string | TStudentValues;
  email: string | TStudentValues;
  dateOfBirth: string | TStudentValues;
  placeOfBirth: string | TStudentValues;
}

async function sendStudentUpdate<TStudentValues>({
  name,
  sex,
  email,
  studentID,
  dateOfBirth,
  placeOfBirth,
}: MutationVariables<TStudentValues>): Promise<unknown> {
  return await fetchWrapper<unknown, TStudentValues | any>({
    method: 'PATCH',
    // url: `http://localhost:3000/students/${studentID}`,
    url: `${process.env.API_BASE_URL}/students/${studentID}`,
    body: { name, sex, email, studentID, dateOfBirth, placeOfBirth },
  });
}

export function useUpdateStudent<TStudentValues>(): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<TStudentValues>,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, MutationVariables<TStudentValues>>(
    ({ name, sex, email, studentID, dateOfBirth, placeOfBirth }) =>
      sendStudentUpdate<TStudentValues>({
        name,
        sex,
        email,
        studentID,
        dateOfBirth,
        placeOfBirth,
      }),
    {
      onError: () => {
        console.error('Error: Failed to update the student.');
      },
      onSettled: (_data, _error) => {
        queryClient.invalidateQueries('students');
      },
    }
  );
}
