export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ErrorModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: number;
  max?: number;
  step?: string | number;
}

export interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}
