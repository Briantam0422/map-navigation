import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

type AutocompleteInputProps = {
  name: string;
  placeholder: string;
  label: string;
};

export default function AutocompleteInputPlace({
  name,
  placeholder,
  label,
}: AutocompleteInputProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "hk" },
    },
    debounce: 300,
    cache: 86400,
  });

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClear = () => {
    clearSuggestions();
  };

  return (
    <Autocomplete
      isClearable
      isRequired
      name={name}
      label={label}
      inputProps={{
        onInput: onChangeInput,
        disabled: !ready,
        onClear: onClear,
      }}
      placeholder={placeholder}>
      {data.map((place) => {
        return (
          <AutocompleteItem value={value} key={place.place_id}>
            {place.description}
          </AutocompleteItem>
        );
      })}
    </Autocomplete>
  );
}
