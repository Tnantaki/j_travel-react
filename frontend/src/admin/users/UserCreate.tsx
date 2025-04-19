import { Create, PasswordInput, SimpleForm, TextInput } from "react-admin"

const UserCreate = () => ( 
  <Create>
    <SimpleForm>
      <TextInput label="Email Address" source="email" type="email" />
      <PasswordInput label="Password" source="password" />
    </SimpleForm>
  </Create>
 )

export default UserCreate