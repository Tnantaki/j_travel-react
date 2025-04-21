import { Datagrid, List, TextField } from "react-admin";

const PlanList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="type" />
      <TextField source="description" />
      <TextField source="price" />
      <TextField source="duration" />
    </Datagrid>
  </List>
);

export default PlanList