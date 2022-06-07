// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import container from '@dependencies';
import { CreateStudyGroup } from '@useCases/studyGroups/createStudyGroup';
import { GetStudyGroup } from '@useCases/studyGroups/getStudyGroups';
import getHandler from '@utils/middleware/getHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default getHandler()
  .get(async (_req: NextApiRequest, res: NextApiResponse) => {
    const getStudyGroup = container.resolve(GetStudyGroup);

    const studyGroup = await getStudyGroup.execute();
    return res.status(200).json(studyGroup);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) {
      throw new Error(`Request missing body: [${req.body}]`);
    }

    const createStudyGroup = container.resolve(CreateStudyGroup);
    const studyGroup = await createStudyGroup.execute(req.body);

    return res.status(200).json(studyGroup);
  });
