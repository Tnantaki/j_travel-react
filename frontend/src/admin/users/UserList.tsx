import { Datagrid, DateField, List, TextField } from "react-admin";

const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="email" />
      <TextField source="isAdmin" />
      <DateField source="createdAt" />
    </Datagrid>
  </List>
);

export default UserList