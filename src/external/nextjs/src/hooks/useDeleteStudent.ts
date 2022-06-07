import { fetchWrapper } from '@utils/fetchWrapper';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

async function deleteStudents(studentID: number[]): Promise<unknown> {
  console.log(studentID);
  const studentDelete = studentID.map((id) => {
    return fetchWrapper<unknown, any>({
      method: 'DELETE',
      // url: `http://localhost:3000/students/${studentID}`,
      url: `${process.env.API_BASE_URL}/students/${id}`,
    });
  });

  return Promise.all(studentDelete);
}

export function useDeleteeStudent(): UseMutationResult<
  unknown,
  unknown,
  number[],
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, number[]>(
    (studentID) => deleteStudents(studentID),
    {
      onError: () => {
        console.error('Error: Failed to delete the student.');
      },
      onSettled: (_data, _error) => {
        queryClient.invalidateQueries('students');
      },
    }
  );
}
