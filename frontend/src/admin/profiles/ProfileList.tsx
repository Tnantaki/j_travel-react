import { Datagrid, ImageField, List, TextField } from "react-admin";

const ProfileList = () => (
  <List>
    <Datagrid>
      <ImageField source="profileImage" />
      <TextField source="username" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

export default ProfileList;
