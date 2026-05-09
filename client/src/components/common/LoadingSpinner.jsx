export default function LoadingSpinner({ size = "md" }) {
  const s = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-12 h-12" : "w-8 h-8";
  return (
    <div className="flex justify-center items-center py-12">
      <div className={`${s} border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin`} />
    </div>
  );
}
