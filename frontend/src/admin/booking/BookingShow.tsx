import {
  ArrayField,
  DateField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const BookingShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ImageField source="plan.images[0].imageUrl" />
      <TextField source="plan.title" />
      <TextField source="plan.type" />
      <TextField source="group.leader.username" />
      <ArrayField source="group.members">
        <SimpleShowLayout>
          <TextField source="username" />
        </SimpleShowLayout>
      </ArrayField>
      <DateField source="firstDay" />
      <DateField source="lastDay" />
      <TextField source="status" />
      <TextField source="paymentStatus" />
    </SimpleShowLayout>
  </Show>
);
