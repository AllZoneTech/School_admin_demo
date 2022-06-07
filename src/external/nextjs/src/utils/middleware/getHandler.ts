import nextConnect, { NextConnect } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { BadRequestError } from "@utilities/helpers/errorTypes";
import { getStatusCode } from "@utilities/helpers/getStatusCode";

type NextConnectWithNextApi = NextConnect<NextApiRequest, NextApiResponse>;

export default function getHandler(): NextConnectWithNextApi {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError: (error: Error, _req, res) => {
      const statusCode = getStatusCode(error);
      res.status(statusCode).send(new BadRequestError(error.message));
    },
    onNoMatch: (req, res) => {
      res.status(405).send(`Method ${req.method} Not Allowed`);
    },
  }).use(async (_req, _res, next) => {
    //for session handling
    next();
  });
}
