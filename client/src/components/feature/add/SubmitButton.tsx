import Button from "@/components/ui/Button";

type SubmitButtonProps = {
  loading?: boolean;
  onPress: () => void;
  title?: string;
};

export default function SubmitButton({
  loading = false,
  onPress,
  title = "Add Book",
}: SubmitButtonProps) {
  return (
    <Button
      title={title}
    //   loading={loading}
      onPress={onPress}
    />
  );
}