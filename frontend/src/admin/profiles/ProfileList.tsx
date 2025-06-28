import { Datagrid, ImageField, List, TextField } from "react-admin";

const ProfileList = () => (
  <List>
    <Datagrid>
      <ImageField source="profileImage" />
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="username" />
    </Datagrid>
  </List>
);

export default ProfileList;
