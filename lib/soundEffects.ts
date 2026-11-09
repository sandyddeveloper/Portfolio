// Web Audio API procedural sound synthesis for cinema-grade high-voltage electricity & lightning strike

let audioCtx: AudioContext | null = null;

/**
 * Lazily creates or returns the shared AudioContext instance.
 */
export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

let isSoundGloballyEnabled = true;

/**
 * Sets whether procedural audio should play.
 */
export function setSoundEnabled(enabled: boolean): void {
  isSoundGloballyEnabled = enabled;
  if (!enabled && audioCtx && audioCtx.state === "running") {
    audioCtx.suspend().catch(() => {});
  }
}

/**
 * Gets whether procedural audio is globally enabled.
 */
export function getSoundEnabled(): boolean {
  return isSoundGloballyEnabled;
}

/**
 * Checks if AudioContext is instantiated and running.
 */
export function isAudioRunning(): boolean {
  return isSoundGloballyEnabled && audioCtx !== null && audioCtx.state === "running";
}

/**
 * Unlocks the Web Audio context upon any user interaction.
 * Crucial for satisfying browser Autoplay policies (Chrome, Edge, Safari, Firefox).
 */
export async function unlockAudio(): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx.state === "running";
  } catch {
    return false;
  }
}

// Automatically attach one-time unlock listeners to the window in the browser
if (typeof window !== "undefined") {
  const handleFirstInteraction = () => {
    unlockAudio();
    window.removeEventListener("pointerdown", handleFirstInteraction);
    window.removeEventListener("click", handleFirstInteraction);
    window.removeEventListener("keydown", handleFirstInteraction);
    window.removeEventListener("touchstart", handleFirstInteraction);
  };

  window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
  window.addEventListener("click", handleFirstInteraction, { passive: true });
  window.addEventListener("keydown", handleFirstInteraction, { passive: true });
  window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
}

/**
 * Generates an organic soft-clipping saturation curve for realistic electrical buzz
 */
function createDistortionCurve(amount = 18): Float32Array {
  const n = 44100;
  const curve = new Float32Array(n);
  const deg = Math.PI / 180;
  for (let i = 0; i < n; ++i) {
    const x = (i * 2) / n - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

/**
 * Enhanced High-Voltage Tesla Energy Hum & Crackle (3-second charge build-up)
 * Rich in audible harmonics (120Hz - 4500Hz) so it sounds crisp and powerful on all laptop speakers & headphones.
 */
export function playElectricHum(durationSeconds = 3.0): () => void {
  if (!isSoundGloballyEnabled) return () => {};

  const ctx = getAudioContext();
  if (!ctx) return () => {};

  // Ensure context is resumed if possible
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();

  // Audible immediate start (0.35) -> ramping to high-voltage crescendo (0.85)
  masterGain.gain.setValueAtTime(0.35, now);
  masterGain.gain.linearRampToValueAtTime(0.55, now + durationSeconds * 0.5);
  masterGain.gain.exponentialRampToValueAtTime(0.88, now + durationSeconds);
  masterGain.connect(ctx.destination);

  // 1. Dual Detuned Sawtooth Mains Hum (120Hz & 122Hz -> rising to 220Hz & 223Hz)
  // Perfectly placed in the human ear's sensitive range + laptop speaker response
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  osc1.type = "sawtooth";
  osc2.type = "sawtooth";

  osc1.frequency.setValueAtTime(120, now);
  osc1.frequency.exponentialRampToValueAtTime(220, now + durationSeconds);

  osc2.frequency.setValueAtTime(122.5, now);
  osc2.frequency.exponentialRampToValueAtTime(224, now + durationSeconds);

  // Soft-clipping distortion unit to add sizzling electric overtones (360Hz - 2500Hz)
  const distortion = ctx.createWaveShaper();
  distortion.curve = createDistortionCurve(16) as unknown as Float32Array<ArrayBuffer>;
  distortion.oversample = "2x";

  const humFilter = ctx.createBiquadFilter();
  humFilter.type = "lowpass";
  humFilter.frequency.setValueAtTime(800, now);
  humFilter.frequency.linearRampToValueAtTime(2400, now + durationSeconds);

  const humGain = ctx.createGain();
  humGain.gain.setValueAtTime(0.42, now);
  humGain.gain.linearRampToValueAtTime(0.65, now + durationSeconds);

  osc1.connect(distortion);
  osc2.connect(distortion);
  distortion.connect(humFilter);
  humFilter.connect(humGain);
  humGain.connect(masterGain);

  // 2. Sub-bass Ground Resonance (60Hz -> 95Hz)
  const subOsc = ctx.createOscillator();
  subOsc.type = "sine";
  subOsc.frequency.setValueAtTime(60, now);
  subOsc.frequency.linearRampToValueAtTime(95, now + durationSeconds);

  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0.35, now);
  subGain.gain.linearRampToValueAtTime(0.5, now + durationSeconds);

  subOsc.connect(subGain);
  subGain.connect(masterGain);

  // 3. High-Voltage Plasma Arc Sizzle & Static Sparks
  // Generates snappy high-voltage micro-discharges and static pops (2kHz - 6kHz)
  const bufferLen = Math.floor(ctx.sampleRate * 2.0);
  const sparkBuffer = ctx.createBuffer(2, bufferLen, ctx.sampleRate);
  const left = sparkBuffer.getChannelData(0);
  const right = sparkBuffer.getChannelData(1);

  for (let i = 0; i < bufferLen; i++) {
    // Random sharp spark impulses
    const isSparkL = Math.random() < 0.14;
    const isSparkR = Math.random() < 0.14;
    const sparkAmpL = isSparkL ? (Math.random() * 2 - 1) * 0.95 : (Math.random() * 2 - 1) * 0.08;
    const sparkAmpR = isSparkR ? (Math.random() * 2 - 1) * 0.95 : (Math.random() * 2 - 1) * 0.08;
    left[i] = sparkAmpL;
    right[i] = sparkAmpR;
  }

  const sparkSource = ctx.createBufferSource();
  sparkSource.buffer = sparkBuffer;
  sparkSource.loop = true;

  const sparkFilter = ctx.createBiquadFilter();
  sparkFilter.type = "bandpass";
  sparkFilter.frequency.setValueAtTime(2600, now);
  sparkFilter.frequency.exponentialRampToValueAtTime(4800, now + durationSeconds);
  sparkFilter.Q.setValueAtTime(1.8, now);

  const sparkGain = ctx.createGain();
  sparkGain.gain.setValueAtTime(0.45, now);
  sparkGain.gain.linearRampToValueAtTime(0.9, now + durationSeconds);

  sparkSource.connect(sparkFilter);
  sparkFilter.connect(sparkGain);
  sparkGain.connect(masterGain);

  // Start oscillators & noise generator
  osc1.start(now);
  osc2.start(now);
  subOsc.start(now);
  sparkSource.start(now);

  const stopTime = now + durationSeconds;
  osc1.stop(stopTime + 0.1);
  osc2.stop(stopTime + 0.1);
  subOsc.stop(stopTime + 0.1);
  sparkSource.stop(stopTime + 0.1);

  return () => {
    try {
      const stopNow = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(stopNow);
      masterGain.gain.linearRampToValueAtTime(0.001, stopNow + 0.04);
      setTimeout(() => {
        try {
          osc1.stop();
          osc2.stop();
          subOsc.stop();
          sparkSource.stop();
          masterGain.disconnect();
        } catch {}
      }, 50);
    } catch {
      // Ignored if already cleaned up
    }
  };
}

/**
 * Cinema-Grade Explosive Lightning Strike & Thunder Detonation
 * Multi-layer:
 * 1. Supersonic whip-crack transient (white noise highpass blast)
 * 2. Ionized electric arc zap (1400Hz -> 140Hz fast laser-snap)
 * 3. Heavy thunderclap shockwave punch (260Hz -> 50Hz)
 * 4. Rolling reverberant thunder rumble across 90Hz - 420Hz
 */
export function playLightningFlashSound(): void {
  if (!isSoundGloballyEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.92, now);
  masterGain.connect(ctx.destination);

  // 1. Supersonic Whip-Crack Transient (0ms attack, snappy high-frequency crack)
  const crackBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
  const crackData = crackBuffer.getChannelData(0);
  for (let i = 0; i < crackData.length; i++) {
    const t = i / ctx.sampleRate;
    const decay1 = Math.exp(-t * 85);
    const decay2 = t > 0.02 ? Math.exp(-(t - 0.02) * 55) : 0;
    crackData[i] = (Math.random() * 2 - 1) * (decay1 * 1.0 + decay2 * 0.7);
  }
  const crackSource = ctx.createBufferSource();
  crackSource.buffer = crackBuffer;

  const crackFilter = ctx.createBiquadFilter();
  crackFilter.type = "highpass";
  crackFilter.frequency.setValueAtTime(1600, now);

  const crackGain = ctx.createGain();
  crackGain.gain.setValueAtTime(0.95, now);
  crackGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

  crackSource.connect(crackFilter);
  crackFilter.connect(crackGain);
  crackGain.connect(masterGain);
  crackSource.start(now);

  // 2. Ionized Arc Zap (Fast downward pitch sweep: 1400Hz -> 140Hz in 80ms)
  const zapOsc = ctx.createOscillator();
  zapOsc.type = "sawtooth";
  zapOsc.frequency.setValueAtTime(1400, now);
  zapOsc.frequency.exponentialRampToValueAtTime(140, now + 0.08);

  const zapGain = ctx.createGain();
  zapGain.gain.setValueAtTime(0.75, now);
  zapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  zapOsc.connect(zapGain);
  zapGain.connect(masterGain);
  zapOsc.start(now);
  zapOsc.stop(now + 0.14);

  // 3. Heavy Sub-Bass Thunder Shockwave Detonation (260Hz down to 50Hz punch)
  const boomOsc = ctx.createOscillator();
  boomOsc.type = "sine";
  boomOsc.frequency.setValueAtTime(260, now);
  boomOsc.frequency.exponentialRampToValueAtTime(50, now + 0.42);

  const boomGain = ctx.createGain();
  boomGain.gain.setValueAtTime(0.95, now);
  boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

  boomOsc.connect(boomGain);
  boomGain.connect(masterGain);
  boomOsc.start(now);
  boomOsc.stop(now + 1.3);

  // 4. Rolling Reverberant Thunder Decay (Low-pass filtered white noise with body at 180Hz)
  const rumbleBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 2.0), ctx.sampleRate);
  const rumbleData = rumbleBuffer.getChannelData(0);
  for (let i = 0; i < rumbleData.length; i++) {
    const t = i / ctx.sampleRate;
    // Rolling multi-peak thunder decay
    const envelope = Math.exp(-t * 1.5) * (1 + 0.4 * Math.sin(t * 18));
    rumbleData[i] = (Math.random() * 2 - 1) * envelope;
  }
  const rumbleSource = ctx.createBufferSource();
  rumbleSource.buffer = rumbleBuffer;

  const rumbleFilter = ctx.createBiquadFilter();
  rumbleFilter.type = "lowpass";
  rumbleFilter.frequency.setValueAtTime(320, now); // Clearly audible on laptop speakers
  rumbleFilter.Q.setValueAtTime(1.5, now);

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0.85, now);
  rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);

  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(masterGain);
  rumbleSource.start(now);
  rumbleSource.stop(now + 1.9);
}
