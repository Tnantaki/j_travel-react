import {
  ArrayInput,
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";
import { ArrayCountDisplay, planChoices, transformPlanData } from "./PlanCreate";
import { useCallback, useState } from "react";

const PlanEdit = () => {
  const [seat, setSeat] = useState(false);
  const transformData = useCallback(transformPlanData, []);

  return (
    <Edit transform={transformData}>
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
            <TextInput source="title" label="Locations" validate={required()} />

            <ArrayInput source="events" label="Events">
              <SimpleFormIterator getItemLabel={(i) => `${i + 1}`}>
                <TextInput source="" label="Event" validate={required()} />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};

export default PlanEdit;
