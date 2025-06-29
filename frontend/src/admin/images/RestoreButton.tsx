import {
  useListContext,
  useNotify,
  useRefresh,
  useUnselectAll,
  Button,
} from "react-admin";
import RestoreIcon from "@mui/icons-material/Restore";
import { dataProvider } from "../dataProvider";

// Custom Restore Button Component
export const BulkRestoreButton: React.FC = () => {
  const resource = "inactiveImages";
  const { selectedIds } = useListContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const unselectAll = useUnselectAll(resource); // Replace with your actual resource name

  const handleRestore = async () => {
    try {
      await dataProvider.updateMany(resource, {
        ids: selectedIds,
        data: {},
      });

      notify(`Successfully restored ${selectedIds.length} items`, {
        type: "success",
      });
      refresh();
      unselectAll();
    } catch (error) {
      notify("Error restoring items", { type: "error" });
      console.error("Restore error:", error);
    }
  };

  return (
    <Button onClick={handleRestore}>
      <RestoreIcon />
      Restore
    </Button>
  );
};
