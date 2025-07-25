import {
  ArrayInput,
  Create,
  ImageField,
  ImageInput,
  minLength,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { transformPlanData } from "../transform";

export const planChoices = [
  { id: "private", name: "Private", seat: true },
  { id: "tour", name: "Tour", seat: false },
];

export const ArrayCountDisplay: React.FC<{
  source: string;
  label?: string;
}> = ({ source, label = "duration" }) => {
  const { watch } = useFormContext();
  const arrayValue = watch(source) || [];

  return (
    <NumberInput
      source={`duration`}
      label={label + arrayValue.length}
      value={arrayValue.length}
      disabled
    />
  );
};

const PlanCreate = () => {
  const [seat, setSeat] = useState(false);
  const transformData = useCallback(transformPlanData, []);

  return (
    <Create transform={transformData}>
      <SimpleForm>
        <SelectInput
          label="Type"
          source="type"
          choices={planChoices}
          validate={required()}
          onChange={(e) => setSeat(e.target.value === "tour")}
        />
        <TextInput label="Title" source="title" validate={required()} />
        <TextInput
          label="Description"
          source="description"
          multiline
          rows={3}
          validate={required()}
        />
        <NumberInput label="Price" source="price" validate={required()} />
        {seat && (
          <NumberInput label="Seats Available" source="seatsAvailable" />
        )}
        <ArrayCountDisplay source="schedules" label="Duration " />
        <ArrayInput source="schedules" label="Daily Schedules" name="schedules">
          <SimpleFormIterator getItemLabel={(i) => `day ${i + 1}`}>
            <TextInput source="title" label="Locations" validate={[required(), minLength(5, '5 charactor at least.')]} />

            <ArrayInput source="events" label="Events">
              <SimpleFormIterator getItemLabel={(i) => `${i + 1}`}>
                <TextInput source="" label="Event" validate={required()} />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
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
