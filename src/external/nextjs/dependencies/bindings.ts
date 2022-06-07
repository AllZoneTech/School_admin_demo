import { Container } from 'inversify';
import { StudentInterface } from '@interfaces/students/studentInterface';
import { StudentAdapter } from '@adapters/student/studentAdapter';
import { StudyGroupInterface } from '@interfaces/studyGroups/studyGroupsInterface';
import { StudyGroupAdapter } from '@adapters/studyGroup/studyGroupAdapter';
import { StudentStudyGroupInterface } from '@interfaces/studentStudyGroup/studentStudyGroupInterface';
import { StudentStudyGroupAdapter } from '@adapters/studentStudyGroup/studentStudyGroupAdapter';
// eslint-disable-next-line import/no-anonymous-default-export
export default function (container: Container): void {
  container.bind(StudentInterface).to(StudentAdapter);
  container.bind(StudyGroupInterface).to(StudyGroupAdapter);
  container.bind(StudentStudyGroupInterface).to(StudentStudyGroupAdapter);
}
