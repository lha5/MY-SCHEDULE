import React from 'react'

import styled from 'styled-components';

const Container = styled.div`
  /* border: 1px solid cyan; */
  margin: 0 auto;
  
  div.copyright {
    color: ${props => props.theme.colors.darkGray};
    margin: 15px auto;
  }

  @media ${props => props.theme.device.desktop} {
    width: 85%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 80%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 85%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function Footer() {
  return (
    <Container>
      <div className="copyright">
        LHA presents. © LHA ALL RIGHTS RESERVED
      </div>
    </Container>
  )
}

export default Footer
