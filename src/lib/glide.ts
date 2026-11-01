// A critically damped spring: it eases in as well as out and carries its speed
// through each new wheel notch, so stacked notches blend into one long glide.
const GLIDE_SMOOTH_TIME_S = 0.17;
const MAX_FRAME_S = 1 / 30;
const SETTLED_DISTANCE = 0.5;
const SETTLED_SPEED = 12;
const LINE_HEIGHT = 16;

// Wheel deltas below this come from a trackpad, which has its own inertia.
export const MIN_NOTCH_DELTA = 40;

export function wheelPixels(event: WheelEvent) {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * LINE_HEIGHT;
  }
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight;
  }
  return event.deltaY;
}

// Eases a scroll position toward a target that can keep moving while it runs.
export function createGlide(write: (position: number) => void) {
  let frame = 0;
  let lastTime = 0;
  let position = 0;
  let target = 0;
  let velocity = 0;

  const finish = () => {
    frame = 0;
    velocity = 0;
  };

  const step = (time: number) => {
    const elapsed = Math.min(Math.max(time - lastTime, 0) / 1000, MAX_FRAME_S);
    lastTime = time;

    const omega = 2 / GLIDE_SMOOTH_TIME_S;
    const x = omega * elapsed;
    const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
    const offset = position - target;
    const impulse = (velocity + omega * offset) * elapsed;
    velocity = (velocity - omega * impulse) * decay;
    position = target + (offset + impulse) * decay;

    const settled =
      Math.abs(target - position) < SETTLED_DISTANCE &&
      Math.abs(velocity) < SETTLED_SPEED;
    if (settled) position = target;
    write(position);

    if (settled) {
      finish();
    } else {
      frame = requestAnimationFrame(step);
    }
  };

  return {
    isRunning: () => frame !== 0,
    target: () => target,
    moveTo(current: number, next: number) {
      target = next;
      if (frame) return;
      position = current;
      velocity = 0;
      lastTime = performance.now();
      frame = requestAnimationFrame(step);
    },
    stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      finish();
    },
  };
}
