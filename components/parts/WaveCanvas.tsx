import { useEffect, useRef } from "react";

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 200;
export const SECONDS_PER_CYCLE = 0.01;

const DEFAULT_SAMPLING_RATE = 1600;
const DEFAULT_QUANTIZATION_BITS = 3;

export const WaveCanvas = ({
  draw,
  samplingRate,
  quantizationBits,
  hover,
}: {
  draw: (ctx: CanvasRenderingContext2D) => void;
  samplingRate?: number;
  quantizationBits?: number;
  hover?: (x: number, y: number) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current == null) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx == null) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    for (
      let x = 1;
      x < CANVAS_WIDTH;
      x += (CANVAS_WIDTH / (samplingRate ?? DEFAULT_SAMPLING_RATE)) * 100
    ) {
      ctx.beginPath();
      ctx.moveTo(Math.ceil(x), 0);
      ctx.lineTo(Math.ceil(x), CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (
      let y = CANVAS_HEIGHT;
      y > 0;
      y -= CANVAS_HEIGHT / 2 ** (quantizationBits ?? DEFAULT_QUANTIZATION_BITS)
    ) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_WIDTH, y);
      ctx.stroke();
    }

    ctx.fillStyle = "black";
    ctx.font = "12px sans-serif";
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    ctx.fillText("0秒", 4, CANVAS_HEIGHT - 4);
    ctx.textAlign = "right";
    ctx.fillText("0.01秒", CANVAS_WIDTH - 4, CANVAS_HEIGHT - 4);

    draw(ctx);
  }, [draw, samplingRate]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ border: "1px black solid" }}
      onMouseMove={(e) => {
        if (canvasRef.current == null) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (hover != null) hover(x, y);
      }}
    />
  );
};
