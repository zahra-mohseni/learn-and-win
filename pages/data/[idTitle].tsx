import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";
const Div = styled.div`
background-color: #e99999de;
margin-top: 127px;
display : flex;
flex-direction : column ; 
align-items : center;
border-radius : 3%;
margin-bottom : 50px

}
`;
const StyledBtn = styled.button`
  padding: 5px;
  box-shadow: black 0px 0px 6px;
  border-radius: 11%;
  margin: 9px;
`;
const InformationPage = () => {
  return (
    <div className="row d-flex flex-column align-items-center ">
      {" "}
      <Div className="col-lg-8 col-md-10 col-sm-10 col-11">
        <img
          style={{ margin: 20, borderRadius: 3 }}
          className="col-8 col-md-7 col-lg-6"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0hVHUIElWd9txFzO8kc1g1_mQnCy6LZbIghuProp2HL4dMtcCntYsNZQ88Rfcrqordd8&usqp=CAU"
        />{" "}
        <p>
          {" "}
          What is Next.js? Next.js is a React framework that gives you building
          blocks to create web applications. By framework, we mean Next.js
          handles the tooling and configuration needed for React, and provides
          additional structure, features, and optimizations for your
          application. You can use React to build your UI, then incrementally
          adopt Next.js features to solve common application requirements such
          as routing, data fetching, integrations - all while improving the
          developer and end-user experience. Whether you’re an individual
          developer or part of a larger team, you can leverage React and Next.js
          to build fully interactive, highly dynamic, and performant web
          applications. In the next lessons, we will discuss how you can get
          started with React and Next.js.
        </p>
        <StyledBtn>start quiz</StyledBtn>
      </Div>
    </div>
  );
};
export default InformationPage;
