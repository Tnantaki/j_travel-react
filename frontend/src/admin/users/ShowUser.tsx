import { DateField, Show, SimpleShowLayout, TextField } from "react-admin"

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