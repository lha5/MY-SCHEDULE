# :ledger: My Schedule - 내 마감을 지켜줘
  > 바쁜 창작자, 작가, 프리랜서를 위한 일정 관리 서비스 <br>
  > https://myschedule.kr

<br>

<img src="https://user-images.githubusercontent.com/55972804/110795901-b230c280-82ba-11eb-907f-4491e7f069dc.png" width="400px" />
  
<br>

## :date: 제작 기간
  - 개인 프로젝트
  - 2021년 02월 14일 ~ 2021년 3월 6일(기본 기능 구현 완료)
  - 기능 및 UI/UX 개선 중

<br>

## :computer: 사용한 기술
#### `Server`
  - Node.js + Express.js
  - MongoDB Atlas + Mongoose
  - Kakao Login
  - jsonwebtoken
  
#### `Client`
  - React.js(CRA)
  - Redux
  - Styled-components
  - Material-UI (+ Material-Icons)
  - Toast UI - calendar component

#### `Infrastructure`
  - AWS - EC2, Route 53
  - SSL(Letsencrypt, certbot)

<br>

## :key: 핵심 기능
  입력된 데이터를 시각화하여 보여주는 것이 이 서비스의 핵심 기능입니다.<br>
  - 사용자가 일정 구분을 등록하고, 일정을 작성하면 해당 날짜에 표시합니다.<br>
  - 원하는 챌린지 목표를 설정하고 생성하면 하나씩 완료할 때마다 체크하여 목표를 이룰 수 있도록 도와줍니다.<br>


<br>

## :mag: 트러블 슈팅
  **스케쥴 관리 컴포넌트로 진입하면 해당 모듈이 제대로 그려지지 않고, 개발자 도구에서도 쉼 없이 렌더링 되는 문제가 있었습니다.**
  - 모듈에서 제공하는 함수도 동작하지 않고, CSS도 깨져보임.
  - 분명 처음 모듈을 적용한 직후에는 잘 동작했고, 심지어 해당 컴포넌트에서 버그를 못 찾았다면, 다른 곳의 코드에서 문제가 발생할 것으로 추측.
  - 다른 컴포넌트에 진입해서도 렌더링이 무한 반복 되는 것을 확인.
  - 커밋 내역을 일일히 대조하며 어떤 시점 이후에 이 문제가 생겼는지 파악한 결과, 로그인 컴포넌트를 헤더와 푸터 없이 보여주기 위해 App.js에서
    index.js로 옮기고 Switch/Route 그리고 higher order component를 중첩 적용한 것이 원인.
  - 처음 작성한 구조로, 우선 App.js로 옮기고 중첩 hoc를 제거한 결과 에러가 해결됨.

<br>

## :bulb: 앞으로 업데이트 하고 싶은 것
  - 단위 테스트를 적용 -> 안정적인 서비스를 제공
  - 단순한 스케쥴표를 넘어서서 마감이 다가올 때나, 중요한 일정을 상기시킬 수 있도록 하는 메시지 송신 및 알람 기능
  - 비로그인 상태에서 로그인한 사용자만 쓸 수 있는 메뉴에 진입하면 로그인 화면으로 이동할 수 있도록 hoc를 적용하였는데,
    잠깐이지만 해당 페이지가 보여서 이러한 현상을 해결하고자 함
