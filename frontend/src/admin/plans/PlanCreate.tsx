import {
  Create,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useState } from "react";

export const planChoices = [
  { id: "private", name: "Private", seat: true },
  { id: "tour", name: "Tour", seat: false },
];

const PlanCreate = () => {
  const [seat, setSeat] = useState(false)

  return (
    <Create>
      <SimpleForm>
        <SelectInput
          label="Type"
          source="type"
          choices={planChoices}
          validate={required()}
          onChange={(e) => setSeat(e.target.value === 'tour')}
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
        <ImageInput label="Upload Image" source="file" multiple >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default PlanCreate;
