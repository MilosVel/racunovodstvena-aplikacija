type ErrorMessageProps = {
  message: string | undefined;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-destructive">{message}</p>;
}
