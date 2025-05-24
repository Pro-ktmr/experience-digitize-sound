import { SECONDS_PER_CYCLE } from "../parts/WaveCanvas";

export class DrawUtils {
  static drawWave(ctx: CanvasRenderingContext2D, wave: number[]) {
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height / 2);
    for (let x = 1; x < ctx.canvas.width; x++) {
      const y =
        (wave[x] * ctx.canvas.height * 0.75) / 2 + ctx.canvas.height / 2;
      ctx.lineTo(x + 1, y);
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  static drawSampleBins(
    ctx: CanvasRenderingContext2D,
    wave: number[],
    samplingRate: number,
    color: string = "blue"
  ) {
    for (
      let x = 1;
      x < ctx.canvas.width;
      x += ctx.canvas.width / samplingRate / SECONDS_PER_CYCLE
    ) {
      const y =
        (wave[Math.ceil(x)] * ctx.canvas.height * 0.75) / 2 +
        ctx.canvas.height / 2;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(Math.ceil(x), y);
      ctx.lineTo(Math.ceil(x), ctx.canvas.height);
      ctx.stroke();
    }
  }

  static drawQuantization(
    ctx: CanvasRenderingContext2D,
    samplingRate: number,
    quantizationBits: number,
    quantizationResults: number[],
    showQuantizationInBinary: boolean = false
  ) {
    for (
      let x = 1;
      x < ctx.canvas.width;
      x += ctx.canvas.width / samplingRate / SECONDS_PER_CYCLE
    ) {
      const y =
        ctx.canvas.height -
        quantizationResults[Math.ceil(x)] *
          (ctx.canvas.height / 2 ** quantizationBits);
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(Math.ceil(x), y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.textAlign = "left";
      ctx.fillText(
        showQuantizationInBinary
          ? quantizationResults[Math.ceil(x)]
              .toString(2)
              .padStart(quantizationBits, "0")
          : quantizationResults[Math.ceil(x)].toString(),
        Math.ceil(x) + 2,
        y - 2
      );
    }
  }
}
