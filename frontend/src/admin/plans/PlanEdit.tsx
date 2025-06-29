import {
  ArrayInput,
  Edit,
  ImageField,
  ImageInput,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useEditController,
} from "react-admin";
import {
  ArrayCountDisplay,
  planChoices,
} from "./PlanCreate";
import { useCallback, useState } from "react";
import { transformPlanData } from "../transform";

interface GetImageType {
  imageUrl: string;
  tag: string[];
  caption: string;
}

const PlanEdit = () => {
  const [seat, setSeat] = useState(false);
  const transformData = useCallback(transformPlanData, []);
  const controllerProps = useEditController();

  let modifiedImage;
  if (controllerProps.record) {
    const images: GetImageType[] = controllerProps.record.images;
    modifiedImage = images.map((img) => ({
      ...img,
      file: {
        src: img.imageUrl,
      },
    }));
  }
  const modifiedRecord = controllerProps.record
    ? {
        ...controllerProps.record,
        images: modifiedImage,
      }
    : undefined;

  return (
    <Edit transform={transformData}>
      <SimpleForm  record={modifiedRecord}>
        <SelectInput
          label="Type"
          source="type"
          choices={planChoices}
          validate={required()}
          onChange={(e) => setSeat(e.target.value === "tour")}
        />
        <TextInput label="Title" source="title" validate={required()} />
        <TextInput
          label="Description"
          source="description"
          multiline
          rows={3}
          validate={required()}
        />
        <NumberInput label="Price" source="price" validate={required()} />
        {seat && (
          <NumberInput label="Seats Available" source="seatsAvailable" />
        )}
        <ArrayCountDisplay source="schedules" label="Duration " />
        <ArrayInput source="schedules" label="Daily Schedules" name="schedules">
          <SimpleFormIterator getItemLabel={(i) => `day ${i + 1}`}>
            <TextInput source="title" label="Locations" validate={required()} />

            <ArrayInput source="events" label="Events">
              <SimpleFormIterator getItemLabel={(i) => `${i + 1}`}>
                <TextInput source="" label="Event" validate={required()} />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
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
    </Edit>
  );
};

export default PlanEdit;
