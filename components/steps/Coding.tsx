import { Button, Typography } from "@mui/material";
import { DrawUtils } from "../libs/DrawUtils";
import { WaveCanvas } from "../parts/WaveCanvas";
import { samplingRateScale } from "./Sampling";

export const Coding = ({
  setStep,
  samplingRate,
  quantizationBits,
  quantizationResults,
}: {
  setStep: (value: number) => void;
  samplingRate: number;
  quantizationBits: number;
  quantizationResults: number[];
}) => {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Button onClick={() => setStep(2)}>前のステップへ</Button>
        <Button onClick={() => setStep(4)}>次のステップへ</Button>
      </div>
      <Typography textAlign="center" marginBottom={2}>
        符号化の結果を確認してください。
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <WaveCanvas
          draw={(ctx) => {
            DrawUtils.drawQuantization(
              ctx,
              samplingRateScale(samplingRate),
              quantizationBits,
              quantizationResults,
              false
            );
          }}
          samplingRate={samplingRateScale(samplingRate)}
          quantizationBits={quantizationBits}
        />
        <span style={{ fontSize: 32 }}>▼</span>
        <WaveCanvas
          draw={(ctx) => {
            DrawUtils.drawQuantization(
              ctx,
              samplingRateScale(samplingRate),
              quantizationBits,
              quantizationResults,
              true
            );
          }}
          samplingRate={samplingRateScale(samplingRate)}
          quantizationBits={quantizationBits}
        />
      </div>
    </>
  );
};
