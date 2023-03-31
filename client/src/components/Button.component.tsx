import React from "react";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  loading?: boolean;
};

export default function Button({ onClick, children, loading = false }: Props) {
  return (
    <button
      onClick={onClick}
      className="border border-blue-500 bg-violet-800 rounded w-full px-4 py-3 text-white font-semibold"
      disabled={loading}
    >
      {loading ? "Processing.." : children}
    </button>
  );
}
