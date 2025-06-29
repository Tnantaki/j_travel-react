import {
  BulkDeleteButton,
  Datagrid,
  ImageField,
  List,
  TextField,
} from "react-admin";
import { BulkRestoreButton } from "./RestoreButton";

// Custom Bulk Actions Toolbar
const CustomBulkActionsToolbar: React.FC = () => (
  <>
    <BulkRestoreButton />
    <BulkDeleteButton />
  </>
);

const InactiveImageList = () => (
  <List title="Inactive Images" >
    <Datagrid bulkActionButtons={<CustomBulkActionsToolbar />}>
      <ImageField source="imageUrl" label="image" />
      <TextField source="fileName" />
      <TextField source="id" />
    </Datagrid>
  </List>
);

export default InactiveImageList;
