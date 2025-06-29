import {
  DateInput,
  Edit,
  ImageField,
  ImageInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useEditController,
} from "react-admin";

export const ProfileEdit = () => {
  const controllerProps = useEditController();

  const modifiedRecord = controllerProps.record
    ? {
        ...controllerProps.record,
        profileImage: controllerProps.record.profileImage
          ? { src: controllerProps.record.profileImage }
          : undefined,
      }
    : undefined;

  return (
    <Edit {...controllerProps}>
      <SimpleForm record={modifiedRecord}>
        <ImageInput source="profileImage">
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
