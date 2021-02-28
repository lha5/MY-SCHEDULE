import React, { useState } from 'react';

import styled from 'styled-components';
import { makeStyles, Modal, Backdrop, Fade } from '@material-ui/core';

import MyCalendarTheme from './MyCalendarTheme';
import CalendarEditor from './CalendarEditor';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const Container = styled.div`
  border: 1px solid red;
`;

function Calendar({ user }) {
  const classes = useStyles();
  const [Open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  return (
    <Container>
      <MyCalendarTheme />
      <button type="button" onClick={handleOpenModal}>
        달력 테마 편집
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={Open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={Open}>
          <CalendarEditor />
        </Fade>
      </Modal>
    </Container>
  );
}

export default Calendar;
