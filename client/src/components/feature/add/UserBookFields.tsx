import { UseFormReturn } from "react-hook-form";

import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { AddBookFormData } from "@/schema/addBook.schema";

type UserBookFieldsProps = {
  form: UseFormReturn<AddBookFormData>;
};

const conditionOptions = [
  { label: "New", value: "new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
  { label: "Poor", value: "poor" },
] as const;

export default function UserBookFields({ form }: UserBookFieldsProps) {
  const { control } = form;

  return (
    <>
      <FormSelect
        control={control}
        name="userBook.condition"
        // label="Select Book Condition"
        placeholder="Select condition"
        options={conditionOptions}
      />

      <FormInput
        control={control}
        name="userBook.notes"
        // label="Notes"
        placeholder="Personal notes..."
        multiline
        numberOfLines={4}
        rounded="3xl"
      />
    </>
  );
}
