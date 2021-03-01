import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  margin-top: 25px;

  div.section-title {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    margin: 15px auto;
    padding: 8px 20px 23px 20px;
    text-align: left;
  }

  div.is-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px auto;

    .notice-empty {
      font-size: 18px;
      color: ${props => props.theme.colors.darkGray};
      margin: 25px auto;
    }
  }
`;

function Challenged() {
  const renderEmpty = () => {
    return (
      <div className="is-empty">
        <div className="notice-empty">지난 챌린지가 없습니다.</div>
      </div>
    );
  }

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">지난 챌린지</div>
      </div>
      {renderEmpty()}
    </Container>
  );
}

export default Challenged;
