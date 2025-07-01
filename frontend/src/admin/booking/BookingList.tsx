import { Datagrid, DateField, List, ReferenceField, TextField } from 'react-admin';

export const BookingList = () => (
    <List>
        <Datagrid>
            {/* <ReferenceField source="_id" reference="s" /> */}
            <TextField source="id" />
            <ReferenceField source="plans" reference="s" />
            <DateField source="firstDay" />
            <DateField source="lastDay" />
            <TextField source="status" />
            <TextField source="paymentStatus" />
        </Datagrid>
    </List>
);