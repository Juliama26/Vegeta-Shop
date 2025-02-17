export default interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  icon?: string;
}
