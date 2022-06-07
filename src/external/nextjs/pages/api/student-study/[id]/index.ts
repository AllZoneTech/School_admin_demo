import container from '@dependencies';
import { CreateStudentStudyGroup } from '@useCases/studentStudyGroup/createStudentStudyGroup';
import { GetStudentsByStudyGroupID } from '@useCases/studentStudyGroup/getStudentsByStudyGroupID';
import getHandler from '@utils/middleware/getHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default getHandler()
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    if (!id) {
      throw new Error(`Request missing id: [${id}] `);
    }
    const getStudents = container.resolve(GetStudentsByStudyGroupID);

    const students = await getStudents.execute(Number(id));
    return res.status(200).json(students);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!Array.isArray(req.body) || !req.query.id) {
      throw new Error(`Request body in incorrect format: [${req.body}]`);
    }

    const createStudentStudyGroup = container.resolve(CreateStudentStudyGroup);
    const student = await createStudentStudyGroup.execute(
      Number(req.query.id),
      req.body
    );

    return res.status(200).json(student);
  });
