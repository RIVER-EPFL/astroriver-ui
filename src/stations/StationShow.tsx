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
    ReferenceInput,
    SelectInput,
    required,
    Labeled,
    useGetRecordId,
    useRecordContext,
    TabbedShowLayoutTabs,
    useGetOne,
    Edit,
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

const TabValue = (id) => {
    const recordId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('stations', { id: recordId });
    if (isLoading) return null;

    // In data.sensors, find the matching ID and return the sensor, if it exists,
    // otherwise return "N/A"
    const sensor = data.sensors.find(sensor => sensor.sensor_position === id);
    if (sensor) {
        return sensor.parameter_name;
    } else {
        return `${id}: N/A`;
    }
}
// in src/MyToolbar.jss
import { Toolbar, SaveButton } from 'react-admin';

export const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Update" />
    </Toolbar>
);

// in src/CommentCreate.jsx
import { Create, SimpleForm, DateInput, TextInput } from 'react-admin';

const CommentCreate = () => {
    const filterToQuery = searchText => ({ name_ilike: `%${searchText}%` });
    const recordId = useGetRecordId();

    return (
        <Edit actions={false}>
            <SimpleForm toolbar={<MyToolbar />} >
                <ReferenceInput
                    source="station_id"
                    reference="station_sensors"
                // filter={{ station_id: recordId }}
                >
                    <SelectInput
                        label="Astrocast Device"
                        source="associated_astrocast_device"
                        optionText={(record) => `${record.name} (${record.deviceTypeName})`}
                        validate={required()}
                    />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
}

const StationShow = () => {
    const record = useRecordContext();
    // if (!record) return null;
    console.log("record", record);
    return (
        <Show actions={<StationShowActions />}>

            <SimpleShowLayout >
                <FunctionField
                    render={record => `${record.name} (${record.acronym})`}
                    label={false}
                    sx={{ color: 'text.primary', fontSize: 26, fontWeight: 'bold' }}
                />

                <Grid container>
                    <Grid item xs={4}>
                        <Labeled>
                            <TextField
                                source="catchment_name"
                                label="Catchment"
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <FunctionField
                                render={record => `${record.x_coordinate}, ${record.y_coordinate}`}
                                label="X, Y coordinates"
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <DateField
                                label="Created (UTC)"
                                source="time_added_utc"
                                sortable={false}
                                showTime={true}
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <ReferenceField
                                label="Assigned Astrocast device"
                                source="associated_astrocast_device"
                                reference="astrocast_devices"
                                link="show"
                            >
                                <FunctionField
                                    label="Active"
                                    render={(record) => `${record.name} (${record.deviceTypeName})`}

                                />
                            </ReferenceField>
                        </Labeled>
                    </Grid>
                    <Grid item xs={6}>
                        <Labeled>
                            <TextField
                                source="description"
                            />
                        </Labeled>
                    </Grid>

                </Grid>

                {/* Show the x and y coordinates as strings to avoid commas */}

            </SimpleShowLayout>
            <TabbedShowLayout tabs={<TabbedShowLayoutTabs
                variant="scrollable"
                scrollButtons={true}
                allowScrollButtonsMobile={true}
            />}
                sx={{ width: 0.8 }} >
                {Array.from({ length: 15 }, (_, index) => (
                    <TabbedShowLayout.Tab
                        key={index + 1}
                        label={TabValue(index + 1)}
                        path={`body${index + 1}`}
                    >
                        <Grid container>
                            <Grid item xs={6}>
                                <><h3>Sensor {index + 1}</h3> Currently Installed:</>
                                <CommentCreate />
                            </Grid>
                        </Grid>
                    </TabbedShowLayout.Tab>
                ))}
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;