import { SOUNDS } from "@/models/Sound";
import { Button, Slider, Typography } from "@mui/material";
import { DrawUtils } from "../libs/DrawUtils";
import { CANVAS_WIDTH, WaveCanvas } from "../parts/WaveCanvas";

export const samplingRateScale = (v: number) => {
  if (v === 1) return 800;
  if (v === 2) return 1600;
  if (v === 3) return 3200;
  if (v === 4) return 6400;
  if (v === 5) return 12800;
  return v;
};

export const Sampling = ({
  setStep,
  soundIdx,
  samplingRate,
  setSamplingRate,
}: {
  setStep: (value: number) => void;
  soundIdx: number;
  samplingRate: number;
  setSamplingRate: (value: number) => void;
}) => {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Button onClick={() => setStep(0)}>前のステップへ</Button>
        <Button onClick={() => setStep(2)}>次のステップへ</Button>
      </div>
      <Typography textAlign="center" marginBottom={2}>
        標本化周波数（1秒間で何個のサンプルを取るか）を選択してください。
      </Typography>
      <Typography>標本化周波数：{samplingRateScale(samplingRate)}</Typography>
      <Slider
        value={samplingRate}
        min={1}
        step={1}
        max={5}
        scale={samplingRateScale}
        valueLabelFormat={(v) => `${v}`}
        onChange={(_, v) => setSamplingRate(v)}
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
            DrawUtils.drawWave(ctx, SOUNDS[soundIdx].getWave(CANVAS_WIDTH))
          }
          samplingRate={samplingRateScale(samplingRate)}
        />
        <span style={{ fontSize: 32 }}>▼</span>
        <WaveCanvas
          draw={(ctx) =>
            DrawUtils.drawSampleBins(
              ctx,
              SOUNDS[soundIdx].getWave(CANVAS_WIDTH),
              samplingRateScale(samplingRate)
            )
          }
          samplingRate={samplingRateScale(samplingRate)}
        />
      </div>
    </>
  );
};
