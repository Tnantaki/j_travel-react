import {
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { planChoices } from "./PlanCreate";
import { useState } from "react";

const PlanEdit = () => {
  const [seat, setSeat] = useState(false);

  return (
    <Edit>
      <SimpleForm>
        <SelectInput
          label="Type"
          source="type"
          choices={planChoices}
          validate={required()}
          onChange={(e) => setSeat(e.target.value === "tour")}
        />
        <TextInput source="title" />
        <TextInput source="description" />
        <NumberInput source="price" />
        <NumberInput source="duration" />
        <NumberInput
          label="Seats Available"
          source="seatsAvailable"
          disabled={!seat}
        />
      </SimpleForm>
    </Edit>
  );
};

export default PlanEdit;
