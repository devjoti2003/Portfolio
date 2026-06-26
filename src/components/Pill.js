export default function Pill({ children, className = '', onClick, ...props }) {
  return (
    <span className={`app-pill ${className}`} onClick={onClick} {...props}>
      {children}
    </span>
  );
}
