import {
  Datagrid,
  ImageField,
  List,
  TextField,
} from "react-admin";

const InactiveImageList = () => (
  <List title="Inactive Images">
    <Datagrid>
      <ImageField source="imageUrl" label="image" />
      <TextField source="fileName" />
      <TextField source="id" />
    </Datagrid>
  </List>
);

export default InactiveImageList;
