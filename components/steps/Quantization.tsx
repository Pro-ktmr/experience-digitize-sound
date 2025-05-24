import { SOUNDS } from "@/models/Sound";
import { Button, Slider, Typography } from "@mui/material";
import { DrawUtils } from "../libs/DrawUtils";
import { CANVAS_HEIGHT, CANVAS_WIDTH, WaveCanvas } from "../parts/WaveCanvas";
import { samplingRateScale } from "./Sampling";

export const Quantization = ({
  setStep,
  soundIdx,
  samplingRate,
  quantizationBits,
  setQuantizationBits,
  quantizationResults,
  setQuantizationResults,
}: {
  setStep: (value: number) => void;
  soundIdx: number;
  samplingRate: number;
  quantizationBits: number;
  setQuantizationBits: (value: number) => void;
  quantizationResults: number[];
  setQuantizationResults: (value: number[]) => void;
}) => {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Button onClick={() => setStep(1)}>前のステップへ</Button>
        <Button onClick={() => setStep(3)}>次のステップへ</Button>
      </div>
      <Typography textAlign="center" marginBottom={2}>
        量子化ビット数（各サンプルの高さを何ビットで表現するか）を選択してください。
        <br />
        また、それぞれのサンプルのドットの高さをマウスで調整してください。
      </Typography>
      <Typography>
        量子化ビット数：{quantizationBits}（{2 ** quantizationBits}段階）
      </Typography>
      <Slider
        value={quantizationBits}
        min={2}
        step={1}
        max={4}
        valueLabelFormat={(v) => `${v}`}
        onChange={(_, v) => setQuantizationBits(v)}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <WaveCanvas
          draw={(ctx) =>
            DrawUtils.drawSampleBins(
              ctx,
              SOUNDS[soundIdx].getWave(CANVAS_WIDTH),
              samplingRateScale(samplingRate)
            )
          }
          samplingRate={samplingRateScale(samplingRate)}
          quantizationBits={quantizationBits}
        />
        <span style={{ fontSize: 32 }}>▼</span>
        <WaveCanvas
          draw={(ctx) => {
            DrawUtils.drawSampleBins(
              ctx,
              SOUNDS[soundIdx].getWave(CANVAS_WIDTH),
              samplingRateScale(samplingRate),
              "#aaf"
            );
            DrawUtils.drawQuantization(
              ctx,
              samplingRateScale(samplingRate),
              quantizationBits,
              quantizationResults
            );
          }}
          samplingRate={samplingRateScale(samplingRate)}
          quantizationBits={quantizationBits}
          hover={(mx, my) => {
            const newQuantizationResults = [...quantizationResults];

            for (
              let x = 1;
              x < CANVAS_WIDTH;
              x += (CANVAS_WIDTH / samplingRateScale(samplingRate)) * 100
            ) {
              if (Math.abs(mx - x) < 8) {
                let q = 0;
                for (
                  let y = CANVAS_HEIGHT;
                  y > 0;
                  y -= CANVAS_HEIGHT / 2 ** quantizationBits
                ) {
                  if (Math.abs(my - y) < 8) {
                    newQuantizationResults[Math.ceil(x)] = q;
                  }
                  q++;
                }
              }
            }
            setQuantizationResults(newQuantizationResults);
          }}
        />
      </div>
    </>
  );
};
