import {
  ArrayField,
  ImageField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  WithListContext,
} from "react-admin";

const PlanShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="title" />
      <TextField source="description" />
      <NumberField source="price" />
      <NumberField source="duration" />
      <NumberField source="seatsAvailable" />
      <ArrayField source="schedules">
        <WithListContext
          render={({ data }) => (
            <ul>
              {data &&
                data.map((item, idx) => (
                  <li key={idx} className="flex flex-col gap-2">
                    <p>
                      Day {item.day} -{item.title}
                    </p>
                    <ul className="list-disc ps-4 flex flex-col gap-1">
                      {Array.isArray(item.events) &&
                        item.events.map((event, idx) => (
                          <li key={idx}>{event}</li>
                        ))}
                    </ul>
                  </li>
                ))}
            </ul>
          )}
        />
      </ArrayField>
      <ArrayField source="images">
        <SingleFieldList>
          <ImageField source="imageUrl" />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export default PlanShow;
