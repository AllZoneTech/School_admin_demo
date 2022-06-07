import { useGetStudents } from '@hooks/useGetStudents';
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';
import * as Yup from 'yup';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Context, MyContext } from '../../pages/_app';
import { useAddStudent } from '../hooks/useAddStudent';
import { useAddStudentStudyGroups } from '../hooks/useAddStudentStudyGroups';
import { useGetStudyGroups } from '../hooks/useGetStudyGroups';
import DataTable from './CustomizeComp/DataTable';
import CircularProgress from '@material-ui/core/CircularProgress';

interface MyFormValues {
  studentID: number;
  name: string;
  sex: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  student_study_groups: [];
}

interface MyStudentData {
  studentID: number;
  name: string;
  sex: string;
  email: string;
  placeOfBirth: string;
  dateOfBirth: string;
  student_study_groups: [];
}

const initialValues: MyFormValues = {
  studentID: 0,
  name: '',
  sex: '',
  email: '',
  placeOfBirth: '',
  dateOfBirth: '',
  student_study_groups: [],
};

function StudentTable(): React.ReactElement {
  const useStyles = makeStyles((theme) => ({
    addNewButton: {
      display: 'flex',
      marginBottom: '20px',
      flexDirection: 'row',
    },
    totalStudents: {
      fontSize: '21px',
      marginRight: '20px',
      marginLeft: '10px',
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
      height: 'auto',
    },
    paper: {
      width: 550,
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '550px',
      gap: '10px',
    },
    formFeilds: {
      width: '100%',
      height: '30px',
    },
  }));

  const { data: studentData, isFetching: isStudentLoading } =
    useGetStudents<MyStudentData>();
  const { data: studyGroups } = useGetStudyGroups();
  const { mutateAsync: createStudent, isLoading: isAddStudentLoading } =
    useAddStudent();
  const {
    mutateAsync: createStudentStudyGroup,
    isLoading: isAddStudentStudyGroupsLoading,
  } = useAddStudentStudyGroups();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [studyGroupValues, setStudyGroupValues] = React.useState<any>([]);
  const [dateOfBirthValue, setDateOfBirth] = React.useState();

  const { state } = React.useContext(Context) as MyContext;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStudyGroupValues([]);
  };

  const handleChecked = (event: any) => {
    setStudyGroupValues([...studyGroupValues, Number(event.target.value)]);
  };

  const handleDateOfBirth = (event: any) => {
    setDateOfBirth(event.target.value);
  };

  const handleAddStudent = async (formValues: MyFormValues) => {
    const studyGroupIDs = studyGroupValues;
    const dateOfBirth = dateOfBirthValue;
    const { studentID, name, sex, email, placeOfBirth }: MyFormValues =
      formValues;

    try {
      const studentId = await createStudent({
        studentID,
        name,
        sex,
        email,
        placeOfBirth,
        dateOfBirth,
      });
      setStudyGroupValues([]);

      await createStudentStudyGroup({
        newStudentID: Number(studentId),
        studyGroupIDs,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'Name must only contain alphabets'
      ),
    sex: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        'Gender must only contain alphabets'
      ),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  return (
    <>
      <div className={classes.addNewButton}>
        <PersonOutlineIcon />
        <div className={classes.totalStudents}>
          {`${
            studentData?.length === undefined ? (
              <CircularProgress />
            ) : (
              studentData?.length
            )
          } Students`}
        </div>

        <Button variant="contained" color="primary" onClick={handleOpen}>
          <AddIcon /> New
        </Button>
      </div>
      <DataTable
        studentData={studentData}
        state={state}
        studyGroups={studyGroups}
        isStudentLoading={isStudentLoading}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleAddStudent(values)}
              validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form className={classes.form}>
                  <h3>Add New Student</h3>
                  <label htmlFor="name">Name:</label>
                  {errors.name && touched.name ? (
                    <div style={{ color: 'red' }}>{errors.name}</div>
                  ) : null}
                  <Field
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className={classes.formFeilds}
                  />
                  <label htmlFor="sex">Sex</label>
                  {errors.sex && touched.sex ? (
                    <div style={{ color: 'red' }}>{errors.sex}</div>
                  ) : null}
                  <Field
                    id="sex"
                    name="sex"
                    placeholder="Enter your gender"
                    className={classes.formFeilds}
                  />
                  <label htmlFor="placeOfBirth">Email</label>
                  {errors.email && touched.email ? (
                    <div style={{ color: 'red' }}>{errors.email}</div>
                  ) : null}
                  <Field
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    className={classes.formFeilds}
                  />
                  <label htmlFor="placeOfBirth">Place Of Birth:</label>
                  {errors.placeOfBirth && touched.placeOfBirth ? (
                    <div style={{ color: 'red' }}>{errors.placeOfBirth}</div>
                  ) : null}
                  <Field
                    id="placeOfBirth"
                    name="placeOfBirth"
                    placeholder="Place of birth"
                    className={classes.formFeilds}
                  />
                  <label htmlFor="dateOfBirth">Date Of Birth:</label>
                  {errors.dateOfBirth && touched.dateOfBirth ? (
                    <div style={{ color: 'red' }}>{errors.dateOfBirth}</div>
                  ) : null}
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className={classes.formFeilds}
                    onChange={(event: any) => handleDateOfBirth(event)}
                  />

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* {errors.student_study_groups &&
                    touched.student_study_groups ? (
                      <div style={{ color: 'red' }}>
                        {errors.student_study_groups}
                      </div>
                    ) : null} */}
                    {studyGroups?.map((studyGroup: any) => {
                      return (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(event) => handleChecked(event)}
                              name="student_study_groups"
                              color="primary"
                              value={studyGroup.groupID}
                            />
                          }
                          label={studyGroup.name}
                        />
                      );
                    })}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="secondary"
                      style={{
                        width: '100px',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{
                        width: '100px',
                      }}
                    >
                      {isAddStudentLoading || isAddStudentStudyGroupsLoading ? (
                        <CircularProgress
                          size={14}
                          style={{ color: 'white' }}
                        />
                      ) : (
                        'Submit'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default StudentTable;
