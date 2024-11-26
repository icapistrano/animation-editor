export const Seekbar: React.FC<{
  onHoverChange: (onHover: boolean) => void;
}> = ({ onHoverChange }) => {
  return (
    <div
      className="absolute w-3 hover:cursor-move h-full"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className="w-0.5 min-h-full -translate-x-1/2 bg-primary"></div>
      <div className="absolute top-0 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-t-[10px] border-t-primary border-r-[5px] border-r-transparent"></div>
    </div>
  );
};
