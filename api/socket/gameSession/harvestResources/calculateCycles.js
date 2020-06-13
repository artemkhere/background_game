export default function calculateCycles(lastCycle) {
  return Math.floor((Date.now() - lastCycle) / 10000);
}
