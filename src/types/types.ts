export type User = {
  id: number;
  first_name: string;
  last_name: string;
  job: string;
};

export type SelectProps<T> = {
  options: T[];
  selectedOption: User;
  onOptionSelect: (user: User) => void;
  optionLayout: (option: T) => React.ReactNode;
  label: (user: User) => string;
  handleScroll: (event: React.UIEvent) => void;
};

export type UserSelectProps = {
  options: User[];
  selectedOption: User;
  onOptionSelect: (user: User) => void;
  renderOption: (user: User) => React.ReactNode;
  label: (user: User) => string;
  loading: boolean;
  hasMore: boolean;
  onScrollEnd: () => void;
};
