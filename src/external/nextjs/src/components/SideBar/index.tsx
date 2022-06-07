import { useGetStudyGroups } from '@hooks/useGetStudyGroups';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import React from 'react';
import { Context, MyContext } from '../../../pages/_app';
import { SidebarContainer } from './styles';

export default function Sidebar() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 250,
      height: 564,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '4px',
      boxShadow: theme.shadows[2],
      padding: theme.spacing(2, 4, 3),
      marginLeft: '15px',
      marginTop: '77px',
    },
  }));
  const classes = useStyles();

  type studyGroupFilters = Array<number>;

  const [studyGroupFilters, setStudyGroupFilters] =
    React.useState<studyGroupFilters>([]);
  const { setState } = (React.useContext(Context) as MyContext) || {};
  const { data: studyGroups } = useGetStudyGroups();
  const handleChecked = async (event: any) => {
    if (event.target?.checked) {
      setStudyGroupFilters([...studyGroupFilters, event.target.value]);
      setState([...studyGroupFilters, event.target.value]);
    } else {
      if (studyGroupFilters.splice(-1)) {
        setStudyGroupFilters([...studyGroupFilters]);
        setState([...studyGroupFilters]);
      }
    }
  };

  return (
    <SidebarContainer>
      <div
        style={{ display: 'flex', flexDirection: 'column' }}
        className={classes.paper}
      >
        <h3>Study Groups</h3>
        {studyGroups?.map((studyGroup: any) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => handleChecked(event)}
                  name="student_study_groups"
                  color="primary"
                  value={studyGroup.name}
                />
              }
              label={studyGroup.name}
            />
          );
        })}
      </div>
    </SidebarContainer>
  );
}
