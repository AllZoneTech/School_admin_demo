import * as yup from "yup";

export const StudyGroupSchema = yup.object({
  groupID: yup.number().required(),
  name: yup.string().max(200),
  leaderOfGroup: yup.string().max(200, "Must be 200 characters or less"),
  subject: yup.string(),
  timeOfStudy: yup.date(),
  noOfStudents: yup.number().default(0),

  // role: yup.mixed().oneOf(["StudyGroup", "admin"]), //enum will accept these two values only
});
export type StudyGroup = yup.InferType<typeof StudyGroupSchema>;
