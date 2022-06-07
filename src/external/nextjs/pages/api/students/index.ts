// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import container from '@dependencies';
import { CreateStudent } from '@useCases/students/createStudent';
import { GetStudents } from '@useCases/students/getStudents';
import getHandler from '@utils/middleware/getHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default getHandler()
  .get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const getStudents = container.resolve(GetStudents);

    const students = await getStudents.execute();
    return res.status(200).json(students);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
      throw new Error(`Request missing body: [${req.body}]`);
    }

    const createStudent = container.resolve(CreateStudent);
    const student = await createStudent.execute(req.body);
    console.log('student', student);
    return res.status(200).json(student);
  });
