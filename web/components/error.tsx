export const Error = ({ error }: { error: string | undefined }) => {
  return (
    error !== undefined && (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  );
};
