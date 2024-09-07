import * as THREE from "three/webgpu";
import React, { useRef } from "react";
import type { ReconcilerRoot, RootState } from "@react-three/fiber";
import {
  extend,
  createRoot,
  unmountComponentAtNode,
  events,
} from "@react-three/fiber";
import type { ViewProps } from "react-native";
import { PixelRatio } from "react-native";
import { Canvas, useCanvasEffect } from "react-native-wgpu";

import { makeWebGPURenderer, ReactNativeCanvas } from "./makeWebGPURenderer";

//global.THREE = global.THREE || THREE;

interface FiberCanvasProps {
  children: React.ReactNode;
  style?: ViewProps["style"];
}

export const FiberCanvas = ({ children, style }: FiberCanvasProps) => {
  const root = useRef<ReconcilerRoot<OffscreenCanvas>>(null!);

  React.useMemo(() => extend(THREE), []);

  const canvasRef = useCanvasEffect(async () => {
    const context = canvasRef.current!.getContext("webgpu")!;
    const renderer = makeWebGPURenderer(context);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const canvas = new ReactNativeCanvas(context.canvas) as HTMLCanvasElement;
    canvas.width = canvas.clientWidth * PixelRatio.get();
    canvas.height = canvas.clientHeight * PixelRatio.get();
    const size = {
      top: 0,
      left: 0,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };

    if (!root.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      root.current = createRoot<any>(canvas);
    }
    root.current.configure({
      size,
      events,
      gl: renderer,
      frameloop: "always",
      dpr: PixelRatio.get(),
      onCreated: async (state: RootState) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        await state.gl.init();
        const renderFrame = state.gl.render.bind(state.gl);
        state.gl.render = (scene: THREE.Scene, camera: THREE.Camera) => {
          renderFrame(scene, camera);
          context?.present();
        };
      },
    });
    root.current.render(children);
    return () => {
      if (canvas != null) {
        unmountComponentAtNode(canvas!);
      }
    };
  });

  return <Canvas ref={canvasRef} style={style} />;
};
