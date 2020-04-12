import React, { useEffect, useState } from "react";
import Flipclock from "react-simple-flipclock";
import axios from "axios";
import {
  Header,
  Code,
  Version,
  ButtonWrapper,
  ViewOnGithub,
  ViewOnNpm,
  Clock,
  ClockWrapper,
  Browser,
  Carbon,
  Footer
} from "./styled";
import { FaGithub, FaNpm } from "react-icons/fa";
import { GiMeshBall } from "react-icons/gi";
import moment from "moment";
import isMobile from "ismobilejs";
import "./App.css";
// require("babel-polyfill");

const userAgent = window.navigator.userAgent;
const ISMOBILE = isMobile(userAgent).any;
const API_ENDPOINT =
  "https://raw.githubusercontent.com/masonwongcs/react-simple-flipclock/master/package.json";

const App = () => {
  const [version, setVersion] = useState("1.0.0");
  const [difference, setDifference] = useState(1234);
  async function getVersion() {
    await axios.get(API_ENDPOINT).then(response => {
      const { data } = response;
      const currentVersion = data.version;
      setVersion(currentVersion);
    });
  }

  function checkDifference() {
    const nextYear = moment()
      .add(1, "year")
      .get("year");
    const current = moment();
    const next = moment(`01/01/${nextYear}`, "dd/mm/YYYY");
    const diff = next.diff(current, "seconds");
    setDifference(diff);
  }

  useEffect(() => {
    getVersion();
    checkDifference();
  });

  return (
    <div className="app">
      <Header>
        <h3>
          <Clock>
            <span className="minutes" />
            <span className="seconds" />
          </Clock>
          React Simple Flipclock
        </h3>
        <p>A very simple React component build with pure CSS</p>
      </Header>
      <Code>npm install react-simple-flipclock --save</Code>
      <ButtonWrapper>
        <ViewOnGithub
          target="_blank"
          href="https://github.com/masonwongcs/react-simple-flipclick"
        >
          <FaGithub />
          View on GitHub
        </ViewOnGithub>
        <ViewOnNpm
          target="_blank"
          href="https://www.npmjs.com/package/react-simple-flipclock"
        >
          <FaNpm />
          View on npm
        </ViewOnNpm>
      </ButtonWrapper>
      <Version>Current version: {version}</Version>
      <main>
        <ClockWrapper>
          <Flipclock seconds={difference} dark fontSize={ISMOBILE ? 24 : 48} />
        </ClockWrapper>
        <h4
          style={{
            margin: 0,
            textAlign: "center",
            color: "rgba(255,255,255,0.6)"
          }}
        >
          Counting down to 2021
        </h4>
      </main>
      <Footer>
        Created by
        <a target="_blank" href="https://github.com/masonwongcs">
          <FaGithub />
          masonwongcs
        </a>
      </Footer>
      {/*<Carbon src="https://carbon.now.sh/embed?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=seti&wt=sharp&l=jsx&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=0px&ph=0px&ln=false&fl=1&fm=Hack&fs=15.5px&lh=133%25&si=false&es=2x&wm=false&code=import%2520*%2520as%2520React%2520from%2520%2522react%2522%253B%250Aimport%2520ReactDOM%2520from%2520%2522react-dom%2522%253B%250Aimport%2520Flipclock%2520from%2520%2522react-simple-marquee%2522%253B%250A%250Aclass%2520App%2520extends%2520React.Component%2520%257B%250A%2520%2520render()%2520%257B%250A%2520%2520%2520%2520return%2520(%250A%2520%2520%2520%2520%2520%2520%253CFlipclock%250A%2520%2520%2520%2520%2520%2520%2520%2520speed%253D%257B2%257D%2520%252F%252F%2520Speed%2520of%2520the%2520marquee%2520(Optional)%250A%2520%2520%2520%2520%2520%2520%2520%2520style%253D%257B%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520%2520%2520height%253A%252030%2520%252F%252F%2520Your%2520own%2520styling%2520(Optional)%250A%2520%2520%2520%2520%2520%2520%2520%2520%257D%257D%250A%2520%2520%2520%2520%2520%2520%253E%250A%2520%2520%2520%2520%2520%2520%2520%2520Your%2520text%2520here%250A%2520%2520%2520%2520%2520%2520%253C%252FFlipclock%253E%250A%2520%2520%2520%2520)%253B%250A%2520%2520%257D%250A%257D%250A%250AReactDOM.render(%253CApp%2520%252F%253E%252C%2520document.getElementById(%2522root%2522))%253B%250A"></Carbon>*/}
    </div>
  );
};

export default App;
