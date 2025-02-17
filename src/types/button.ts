export default interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset" | "checkbox";
}
