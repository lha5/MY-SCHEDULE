import React from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px calc(25%);
  margin: 0 auto;
  border-top: 1px solid ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.darkGray};
`;

function Footer() {
  return (
    <Container>
      <div className="copyright">
        LHA presents. © LHA ALL RIGHTS RESERVED SINCE 2021
      </div>
    </Container>
  );
}

export default Footer;
