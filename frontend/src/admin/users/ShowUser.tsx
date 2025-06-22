import { DateField, Show, SimpleShowLayout, TextField } from "react-admin"

// there no api for get by id, some field will didn't display value
const ShowUser = () => ( 
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="isAdmin" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
 )

export default ShowUser