import {
  ArrayInput,
  Create,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";
import { useState } from "react";

export const planChoices = [
  { id: "private", name: "Private", seat: true },
  { id: "tour", name: "Tour", seat: false },
];

const PlanCreate = () => {
  const [seat, setSeat] = useState(false);

  return (
    <Create>
      <SimpleForm>
        <SelectInput
          label="Type"
          source="type"
          choices={planChoices}
          validate={required()}
          onChange={(e) => setSeat(e.target.value === "tour")}
        />
        <TextInput label="Title" source="title" />
        <TextInput label="Description" source="description" />
        <NumberInput label="Price" source="price" />
        <NumberInput label="Duration" source="duration" />
        <NumberInput
          label="Seats Available"
          source="seatsAvailable"
          disabled={!seat}
        />
        <ArrayInput source="images" label="Images">
          <SimpleFormIterator>
            <ImageInput label="Upload Image" source="file">
              <ImageField source="src" title="title" />
            </ImageInput>
            <div className="flex gap-4">
              <TextInput source="tag" label="Tag" />
              <TextInput source="caption" label="Caption" />
            </div>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default PlanCreate;
