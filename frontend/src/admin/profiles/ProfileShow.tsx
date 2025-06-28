import {
  DateField,
  EmailField,
  ImageField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const ProfileShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ImageField source="profileImage" />
      <TextField source="user" />
      <TextField source="username" />
      <TextField source="phone" />
      <EmailField source="email" />
      <DateField source="birthday" />
      <TextField source="gender" />
      <TextField source="idNumber" />
      <DateField source="passportNumber" />
      <TextField source="address.street" />
      <TextField source="address.building" />
      <TextField source="address.houseNo" />
      <TextField source="address.district" />
      <TextField source="address.postalCode" />
      <TextField source="address.subDistrict" />
      <TextField source="address.province" />
      <TextField source="address.country" />
    </SimpleShowLayout>
  </Show>
);
