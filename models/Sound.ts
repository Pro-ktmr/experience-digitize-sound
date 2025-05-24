import { SECONDS_PER_CYCLE } from "@/components/parts/WaveCanvas";

export type Sound = {
  createOscillators: (ctx: AudioContext) => OscillatorNode[];
  getWave: (width: number) => number[];
};

const getSineWave = (f: number, width: number) => {
  const wave = new Array(width);
  for (let x = 0; x < width; x++) {
    const actualX = (x / width) * 2 * Math.PI * SECONDS_PER_CYCLE;
    wave[x] = -Math.sin(actualX * f);
  }
  return wave;
};

const getSquareWave = (f: number, width: number) => {
  const wave = new Array(width);
  for (let x = 0; x < width; x++) {
    const actualX = (x / width) * 2 * Math.PI * SECONDS_PER_CYCLE;
    wave[x] = Math.sin(actualX * f) >= 0 ? -1 : 1;
  }
  return wave;
};

export const SOUNDS: Sound[] = [
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSineWave(880, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSineWave(440, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(220, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSineWave(220, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(262, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSineWave(262, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(262, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSquareWave(262, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(330, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSquareWave(330, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(392, ctx.currentTime);
      return [oscillator];
    },
    getWave: (width) => getSquareWave(392, width),
  },
  {
    createOscillators: (ctx) => {
      const oscillator1 = ctx.createOscillator();
      oscillator1.type = "square";
      oscillator1.frequency.setValueAtTime(262, ctx.currentTime);
      const oscillator2 = ctx.createOscillator();
      oscillator2.type = "square";
      oscillator2.frequency.setValueAtTime(330, ctx.currentTime);
      const oscillator3 = ctx.createOscillator();
      oscillator3.type = "square";
      oscillator3.frequency.setValueAtTime(392, ctx.currentTime);
      return [oscillator1, oscillator2, oscillator3];
    },
    getWave: (width) => {
      const wave1 = getSquareWave(262, width);
      const wave2 = getSquareWave(330, width);
      const wave3 = getSquareWave(392, width);
      return wave1.map((v, i) => (v + wave2[i] + wave3[i]) / 3);
    },
  },
];
