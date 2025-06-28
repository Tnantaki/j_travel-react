import { Create, DateInput, SelectInput, SimpleForm, TextInput } from "react-admin"

const ProfileCreate = () => ( 
  <Create>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="phone" />
      <TextInput source="email" type="email" />
      <DateInput source="birthday" />
      <SelectInput source="gender" choices={[
        {id: 'female', name: 'Female'},
        {id: 'male', name: 'Male'},
      ]} />
      <TextInput source="idNumber" />
      <TextInput source="passportNumber" />
      <TextInput source="address.street" />
      <TextInput source="address.building" />
      <TextInput source="address.houseNo" />
      <TextInput source="address.district" />
      <TextInput source="address.postalCode" />
      <TextInput source="address.subDistrict" />
      <TextInput source="address.province" />
      <TextInput source="address.country" />
    </SimpleForm>
  </Create>
 )

export default ProfileCreate