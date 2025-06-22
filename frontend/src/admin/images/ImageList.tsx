import { Datagrid, ImageField, List, Pagination, TextField, TextInput } from "react-admin";

const tagFilter = [
  <TextInput key="tags" label="Search by tag" source="tags" alwaysOn />,
]

const ImageList = () => (
  <List pagination={<Pagination />} title="Images" filters={tagFilter}>
    <Datagrid rowClick="edit">
      <ImageField source="imageUrl" label="image" />
      <TextField source="fileName" />
      <TextField source="id" />
    </Datagrid>
  </List>
);

export default ImageList