export default function LoadingSpinner() {
  return (
    <div
      className="h-8 w-8 animate-spin rounded-full border-2 border-[#1A4D8F] border-t-transparent"
      role="status"
      aria-label="Loading"
    />
  );
}
