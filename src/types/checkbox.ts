export default interface CheckboxProps {
  label?: string;
  name?: string;
  image?: string;
  price?: number;
  checked?: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
}
