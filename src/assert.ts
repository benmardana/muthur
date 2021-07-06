export default function assert(
  condition: any,
  errorMessage?: string
): asserts condition {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
