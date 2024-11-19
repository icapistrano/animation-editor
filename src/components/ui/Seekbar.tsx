export const Seekbar: React.FC = () => {
  return (
    <div className="w-3 relative hover:cursor-ew-resize">
      <div className="w-0.5 min-h-36 -translate-x-1/2 bg-secondary"></div>
      <div className="absolute top-0 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[20px] border-t-secondary border-r-[10px] border-r-transparent"></div>
    </div>
  );
};
