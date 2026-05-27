export const TextFileIcon: React.FC<{ className?: string }> = ({
  className = "w-10 h-10",
}) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 1h10v14H3V1z"
      fill="#ffffff"
      stroke="#808080"
      strokeWidth="0.5"
    />
    <path
      d="M4 3h8v1H4V3z M4 5h8v1H4V5z M4 7h8v1H4V7z M4 9h6v1H4V9z"
      fill="#000080"
    />
  </svg>
);
