// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import container from '@dependencies';
import { DeleteStudent } from '@useCases/students/deleteStudent';
import { UpdateStudent } from '@useCases/students/updateStudent';
import getHandler from '@utils/middleware/getHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default getHandler()
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id || !req.body) {
      throw new Error(`Request missing id: [${id}] or body: [${req.body}]`);
    }

    const updateStudent = container.resolve(UpdateStudent);

    const student = await updateStudent.execute(Number(id), req.body);

    return res.status(200).json(student);
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id) {
      throw new Error(`Request missing id: [${id}] `);
    }

    const deleteStudent = container.resolve(DeleteStudent);

    const student = await deleteStudent.execute(Number(id));

    return res.status(200).json(student);
  });
