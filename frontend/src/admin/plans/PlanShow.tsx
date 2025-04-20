import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const PlanShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="title" />
      <TextField source="description" />
      <NumberField source="price" />
      <NumberField source="duration" />
      <NumberField source="seatsAvailable" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);

export default PlanShow;
