import { useState } from "react";
import { Pressable, View } from "react-native";

import Input from "./Input";
import AppText from "./AppText";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;

  placeholder?: string;
  error?: boolean;

  addButtonText?: string;
};

export default function TagsInput({
  value,
  onChange,
  placeholder,
  error,
  addButtonText = "Add",
}: TagsInputProps) {
  const [text, setText] = useState("");

  function addTag() {
    const tag = text.trim();

    if (!tag) return;

    if (value.includes(tag)) {
      setText("");
      return;
    }

    onChange([...value, tag]);
    setText("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <View>
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <Input
            value={text}
            placeholder={placeholder}
            onChangeText={setText}
            onSubmitEditing={addTag}
            returnKeyType="done"
            error={error}
          />
        </View>

        <Pressable
          onPress={addTag}
          className="rounded-full bg-primary px-6 py-3"
        >
          <AppText weight="medium" className="text-text-inverse">
            {addButtonText}
          </AppText>
        </Pressable>
      </View>

      {value.length > 0 && (
        <View className="mt-3 flex-row flex-wrap gap-2">
          {value.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => removeTag(tag)}
              className="rounded-full bg-primary px-3 py-2"
            >
              <AppText className="text-text-inverse">
                {tag} ✕
              </AppText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}