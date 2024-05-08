interface Button1Props {
  children: string;
  color?: "primary" | "secondary" | "success" | "danger";
  onClickButton: () => void;
}

const Button1 = ({
  children,
  color = "primary",
  onClickButton,
}: Button1Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={onClickButton}
    >
      {children}
    </button>
  );
};

export default Button1;
