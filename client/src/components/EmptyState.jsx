export default function EmptyState({ message }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[#6F6F6F]">{message}</p>
    </div>
  );
}
