import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledPanel = styled.div`
  position: fixed;
  z-index: 100;
  top: 50px;
  left: 50px;
`;

const StyledButton = styled(Button)`
  height: 50px;
  width: 50px;
  margin: 5px;
  border-radius: 50px !important;
`;

const Panel = props => {
  const state = {
    addMarkersAllowed: false,
    editMarkersAllowed: false,
    action: false,
    cursor: '',
  };

  const addMarkersAllow = () => {
    state.action = 'add';
    state.cursor = 'crosshair';
    props.onClick(state);
  };

  const editMarkersAllow = () => {
    state.action = 'edit';
    state.cursor = 'crosshair';

    props.onClick(state);
  };

  const deleteMarkersAllow = () => {
    state.action = 'delete';
    state.cursor = 'crosshair';
    props.onClick(state);
  };

  return (
    <StyledPanel>
      <StyledButton type="button" onClick={addMarkersAllow}>
        <FontAwesomeIcon icon={faPlus} />
      </StyledButton>
      <StyledButton type="button" onClick={editMarkersAllow}>
        <FontAwesomeIcon icon={faPen} />
      </StyledButton>
      <StyledButton type="button" onClick={deleteMarkersAllow}>
        <FontAwesomeIcon icon={faTrash} />
      </StyledButton>
    </StyledPanel>
  );
};

export default Panel;
