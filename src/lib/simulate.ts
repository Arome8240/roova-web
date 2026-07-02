export function simulateNetwork<T>(payload: T, delay = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(payload), delay));
}
