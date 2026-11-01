const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z";

function StarRow({ className }: { className: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          aria-hidden="true"
          className="size-[1em] shrink-0 fill-current"
          key={star}
          viewBox="0 0 24 24"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

export function RatingStars({
  className = "",
  fillClass = "text-spark",
  rating,
}: {
  className?: string;
  fillClass?: string;
  rating: number;
}) {
  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className={`relative inline-block ${className}`}
      role="img"
    >
      <StarRow className="text-white/20" />
      {/* Clipped to the rating so 4.6 fills 92% of the row. */}
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        <StarRow className={`${fillClass} w-max`} />
      </span>
    </span>
  );
}
