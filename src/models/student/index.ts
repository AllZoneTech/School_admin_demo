import * as yup from "yup";
import { StudyGroupSchema } from "../studyGroup";
export const StudentSchema = yup.object({
  studentID: yup.number().required(),
  name: yup.string().max(200),
  email: yup.string().max(200, "Must be 200 characters or less"),
  sex: yup.string(),
  dateOfBirth: yup.date().nullable(true),
  placeOfBirth: yup.string().nullable(true),
  studentStudyGroupID: yup.number(),
  studyGroups: yup.array().of(StudyGroupSchema),
  // role: yup.mixed().oneOf(["Student", "admin"]), //enum will accept these two values only
});
export type Student = yup.InferType<typeof StudentSchema>;
