import { CANVAS_WIDTH } from "@/components/parts/WaveCanvas";
import { Chooser } from "@/components/steps/Chooser";
import { Coding } from "@/components/steps/Coding";
import { Quantization } from "@/components/steps/Quantization";
import { Sampling, samplingRateScale } from "@/components/steps/Sampling";
import {
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";

const getDefaultArray = () => Array.from({ length: 802 }, () => 0);

const STEPS = ["デジタル化するデータの選択", "標本化", "量子化", "符号化"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [soundIdx, setSoundIdx] = useState(0);
  const [samplingRate, setSamplingRate] = useState(2);
  const [quantizationBits, setQuantizationBits] = useState(3);
  const [quantizationResults, setQuantizationResults] =
    useState<number[]>(getDefaultArray());

  return (
    <>
      <Head>
        <title>音のデジタル化 体験ツール</title>
      </Head>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1">
          音のデジタル化 体験ツール
        </Typography>
        <Stepper activeStep={step} alternativeLabel sx={{ my: 4 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === 0 && (
          <Chooser
            setStep={setStep}
            soundIdx={soundIdx}
            setSoundIdx={setSoundIdx}
          />
        )}
        {step === 1 && (
          <Sampling
            setStep={setStep}
            soundIdx={soundIdx}
            samplingRate={samplingRate}
            setSamplingRate={setSamplingRate}
          />
        )}
        {step === 2 && (
          <Quantization
            setStep={setStep}
            soundIdx={soundIdx}
            samplingRate={samplingRate}
            quantizationBits={quantizationBits}
            setQuantizationBits={setQuantizationBits}
            quantizationResults={quantizationResults}
            setQuantizationResults={setQuantizationResults}
          />
        )}
        {step === 3 && (
          <Coding
            setStep={setStep}
            soundIdx={soundIdx}
            samplingRate={samplingRate}
            quantizationBits={quantizationBits}
            setQuantizationBits={setQuantizationBits}
            quantizationResults={quantizationResults}
            setQuantizationResults={setQuantizationResults}
          />
        )}

        {step === 4 && (
          <>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <Button onClick={() => setStep(3)}>前のステップへ</Button>
            </div>
            <Typography>
              標本化周波数：{samplingRateScale(samplingRate)}
            </Typography>
            <Typography>
              量子化ビット数：{quantizationBits}（{2 ** quantizationBits}段階）
            </Typography>
            <div>データ：</div>
            <textarea
              style={{
                width: 16 * 8,
                fontSize: 32,
              }}
              rows={16}
              defaultValue={(() => {
                const result = [];
                for (
                  let x = 1;
                  x < CANVAS_WIDTH;
                  x += (CANVAS_WIDTH / samplingRateScale(samplingRate)) * 100
                ) {
                  result.push(
                    quantizationResults[Math.ceil(x)]
                      .toString(2)
                      .padStart(quantizationBits, "0")
                  );
                }
                return result.join("\n");
              })()}
              disabled
            />
          </>
        )}
      </Container>
    </>
  );
}
