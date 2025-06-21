import { Datagrid, ImageField, List, Pagination, TextField } from "react-admin";

const ImageList = () => (
  <List pagination={<Pagination />} title="Images">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="fileName" />
      <ImageField source="imageUrl" label="image" />
    </Datagrid>
  </List>
);

export default ImageList