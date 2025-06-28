import { useState } from "react";
import {
  DateInput,
  Edit,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ProfileEdit = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleChange = (files: any) => {
    setSelectedFiles(files);
    console.log("Files selected:", files);
  };

  return (
    <Edit>
      <SimpleForm>
        {!selectedFiles && (
          <ImageField source="profileImage" title="Current Profile Image" />
        )}
        <ImageInput
          source="newProfileImage"
          label="Upload New Profile Image"
          onChange={handleChange}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <TextInput source="username" />
        <TextInput source="phone" />
        <TextInput source="email" type="email" />
        <DateInput source="birthday" />
        <SelectInput
          source="gender"
          choices={[
            { id: "female", name: "Female" },
            { id: "male", name: "Male" },
          ]}
        />
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
    </Edit>
  );
};
