import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import throttle from "lodash.throttle";
// import Svg from "./Svg";
import usePaintHue from "./usePaintHue";
import config from "./config";

const { squareSize, barSize, delay } = config;

export const HueWrapper = styled.div`
  position: relative;
  width: ${squareSize + "px"};
  height: ${barSize + "px"};
  cursor: ew-resize;
  margin-top: 14px;
`;

export const Canvas = styled.canvas.attrs(() => ({
  width: squareSize,
  height: barSize,
}))``;

export const Handle = styled.div.attrs((p) => ({
  style: {
    left: p.left + "px",
    transition: p.animate ? "left .2s ease-out" : "0s",
  },
}))`
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${barSize}px;
  pointer-events: none;
`;

const Hue = ({ hueX, offsetLeft, animate, setHueX, setHue, setAnimate }) => {
  const bar = useRef(null);
  const canvas = useRef(null);

  usePaintHue(canvas);

  useEffect(() => {
    function computePosition(e) {
      return Math.max(
        barSize / -2,
        Math.min(e.clientX - offsetLeft + squareSize, squareSize - barSize / 2)
      );
    }

    function computeHue(x) {
      return Math.round((x + barSize / 2) * (360 / squareSize));
    }

    const onMouseMove = throttle((e) => {
      const x = computePosition(e);
      const hue = computeHue(x);

      setHueX(x);
      setHue(hue);
    }, delay);

    function onMouseUp(e) {
      const x = computePosition(e);
      const hue = computeHue(x);
      setHueX(x);
      setHue(hue);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    function onMouseDown() {
      setAnimate(false);
      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp);
    }

    const barRef = bar.current;
    barRef.addEventListener("mousedown", onMouseDown);

    return () => {
      barRef.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, [offsetLeft, setHue, setHueX, setAnimate]);
  //    // <Svg name="handle" />
  return (
    <HueWrapper ref={bar}>
      <Handle left={hueX} animate={animate}>
        <span
          style={{
            height: "32px",
            width: "32px",
            backgroundColor: "red",
            borderRadius: "50%",
            display: "inline-block",
            boxShadow: "0 3px 12px 0 #000000",
            border: "solid 2px #ffffff",
          }}
        ></span>
      </Handle>
      <Canvas ref={canvas} />
    </HueWrapper>
  );
};

export default Hue;
