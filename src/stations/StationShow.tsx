import {
    Show,
    SimpleShowLayout,
    TextField,
    ReferenceField,
    EditButton,
    TopToolbar,
    DeleteButton,
    usePermissions,
    DateField,
    FunctionField,
    TabbedShowLayout,
    RichTextField,
    NumberField,
    ReferenceManyField,
    Datagrid,
    useGetRecordId,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Grid } from '@mui/material';

const StationShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const StationShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<StationShowActions />}>

            <SimpleShowLayout>
                <Grid container>
                    <Grid item xs={8}>
                        <SimpleShowLayout>
                            <TextField source="name" label="Station name" />
                        </SimpleShowLayout>
                    </Grid>
                    <Grid item xs={4}>
                        <SimpleShowLayout>
                            <TextField source="acronym" label="Station acronym" />
                        </SimpleShowLayout>
                    </Grid>
                </Grid>


                <TextField source="catchment_name" />
                <TextField source="description" />

                {/* Show the x and y coordinates as strings to avoid commas */}
                <TextField source="x_coordinate" label="X coordinate" />
                <TextField source="y_coordinate" label="Y coordinate" />

                <ReferenceField
                    label="Astrocast Device"
                    source="associated_astrocast_device"
                    reference="astrocast_devices"
                    link="show"
                >
                    <FunctionField
                        label="Active"
                        render={(record) => `${record.name} (${record.deviceTypeName})`}

                    />
                </ReferenceField>

                <DateField
                    label="Time added (UTC)"
                    source="time_added_utc"
                    sortable={false}
                    showTime={true}
                />

            </SimpleShowLayout>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="health status" path="body">
                    <RichTextField source="body" label={false} />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab
                    label="Sensors"
                // path="comments"
                >
                    <ReferenceManyField
                        reference="astrocast_messages"
                        filter={{ deviceGuid: recordId }}
                        target="deviceGuid"
                    >
                        <Datagrid>
                            <TextField source="body" />
                            <DateField source="created_at" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;