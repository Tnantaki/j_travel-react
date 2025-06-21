import {
  ArrayInput,
  Create,
  ImageField,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

const ImageCreate = () => (
  <Create>
    <SimpleForm>
      <ArrayInput source="images" label="Images">
        <SimpleFormIterator>
          <ImageInput label="Upload Image" source="file">
            <ImageField source="src" title="title" />
          </ImageInput>
          <div className="flex gap-4">
            <TextInput source="tag" label="Tag" />
            <TextInput source="caption" label="Caption" />
          </div>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default ImageCreate;
