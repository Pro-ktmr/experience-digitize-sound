import { Sound } from "@/models/Sound";
import { Button } from "@mui/material";
import { DrawUtils } from "../libs/DrawUtils";
import { CANVAS_WIDTH, WaveCanvas } from "./WaveCanvas";

export const SoundPlayer = ({ sound }: { sound: Sound }) => {
  const play = () => {
    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.02;
    gainNode.connect(ctx.destination);
    const oscillators = sound.createOscillators(ctx);
    oscillators.forEach((oscillator) => {
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 1);
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin: "8px 0",
      }}
    >
      <WaveCanvas
        draw={(ctx) => DrawUtils.drawWave(ctx, sound.getWave(CANVAS_WIDTH))}
      />
      <Button onClick={play}>再生</Button>
    </div>
  );
};
