import { SOUNDS } from "@/models/Sound";
import { Button, Radio, Typography } from "@mui/material";
import { SoundPlayer } from "../parts/SoundPlayer";

export const Chooser = ({
  setStep,
  soundIdx,
  setSoundIdx,
}: {
  setStep: (value: number) => void;
  soundIdx: number;
  setSoundIdx: (value: number) => void;
}) => {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Button onClick={() => setStep(1)}>次のステップへ</Button>
      </div>
      <Typography textAlign="center" marginBottom={2}>
        デジタル化したい音を選択してください。
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {SOUNDS.map((sound, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Radio
              checked={soundIdx === idx}
              onChange={(e) => {
                if (e.target.checked) setSoundIdx(idx);
              }}
            />
            <SoundPlayer sound={sound} />
          </div>
        ))}
      </div>
    </>
  );
};
