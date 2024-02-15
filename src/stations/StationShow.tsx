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
    ReferenceInput,
    SelectInput,
    required,
    Labeled,
    useGetRecordId,
    useRecordContext,
    TabbedShowLayoutTabs,
    useGetOne,
    Edit,
    SimpleForm,
    Toolbar,
    SaveButton,
    WithRecord,
    RecordContextProvider,

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

const TabValue = (id: number) => {
    const recordId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('stations', { id: recordId });
    if (isLoading) return null;

    // Get the data.sensor_link.sensor_id for the
    // data.sensor_link.sensor_position that corresponds to the id param
    const sensor_link = data.sensor_link.find(link => link.sensor_position == id);
    if (sensor_link) {
        const sensor = data.sensors.find(sensor => sensor.id === sensor_link.sensor_id);
        if (sensor) {
            return `${id}: ${sensor.parameter_acronym}`;
        }
    }
    return `${id}: N/A`;

}

export const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Update" />
    </Toolbar>
);


const CommentCreate = () => {
    const filterToQuery = searchText => ({ name_ilike: `%${searchText}%` });
    const recordId = useGetRecordId();

    return (
        <Edit actions={false}>
            <SimpleForm toolbar={<MyToolbar />} >
                <ReferenceInput
                    source="station_id"
                    reference="station_sensors"
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


const StationSensorDetails = props => {
    // The sensor details layout lives here..!

    const recordId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('stations', { id: recordId });
    if (isLoading) return null;
    console.log('data', data);

    const sensor_link = data.sensor_link.find(link => link.sensor_position == props.sensor_position);
    console.log("sensor_link", sensor_link);
    if (sensor_link) {
        const sensor = data.sensors.find(sensor => sensor.id === sensor_link.sensor_id);
        console.log("sensor", sensor);
        return (
            <RecordContextProvider value={sensor}>
                {/* <h1>{defaultTitle}</h1> */}
                <SimpleShowLayout>
                    <TextField source="id" label="Currently installed" />

                    <TextField source="parameter_name" />
                    <TextField source="parameter_acronym" />
                    <TextField source="parameter_unit" />
                    <TextField source="parameter_db_name" />
                    <TextField source="serial_number" />
                    <TextField source="model" />
                    <ReferenceField
                        label="Assigned Station"
                        source="station_link.station_id"
                        reference="stations"
                        link="show"
                        emptyText="N/A"
                    >
                        <FunctionField
                            label="Active"
                            render={(record) => `${record.name} (${record.deviceTypeName})`}

                        />
                    </ReferenceField>
                    <DateField
                        label="Last Updated"
                        source="calibrated_on"
                        sortable={false}
                        showTime={true}
                    />
                </SimpleShowLayout>
            </RecordContextProvider>
        );
    } else {
        return null;
    }
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
                                <StationSensorDetails sensor_position={index + 1} />
                            </Grid>
                        </Grid>
                    </TabbedShowLayout.Tab>
                ))}
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;