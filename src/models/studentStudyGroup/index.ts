import * as yup from "yup";

export const StudentStudyGroupSchema = yup.object({
  studentStudyGroupID: yup.number().required(),
  groupID: yup.number().required(),
  studentID: yup.number().required(),
});
export type StudentStudyGroup = yup.InferType<typeof StudentStudyGroupSchema>;
