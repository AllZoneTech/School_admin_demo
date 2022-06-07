// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import container from '@dependencies';
import { DeleteStudentStudyGroup } from '@useCases/studentStudyGroup/deleteStudentStudyGroup';
import getHandler from '@utils/middleware/getHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default getHandler().delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { groupID, studentID } = req.query;
    if (!groupID || !studentID) {
      throw new Error(
        `Request missing groupID: [${groupID}] OR Request missing studentID: [${studentID}] `
      );
    }
    const deleteStudentStudyGroup = container.resolve(DeleteStudentStudyGroup);
    const studentStudyGroupParam = {
      groupID: Number(groupID),
      studentID: Number(studentID),
    };

    const students = await deleteStudentStudyGroup.execute(
      studentStudyGroupParam
    );
    return res.status(200).json(students);
  }
);
