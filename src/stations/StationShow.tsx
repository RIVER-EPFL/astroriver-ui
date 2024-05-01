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
    Labeled,
    useGetRecordId,
    useRecordContext,
    TabbedShowLayoutTabs,
    useGetOne,
    RecordContextProvider,
    ArrayField,
    Datagrid,
    NumberField,
    CreateButton,
    useRedirect,
    useRefresh,
    useNotify,
    useDelete,
    Button,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import Plot from 'react-plotly.js';
import { Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const StationShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}

const tabValue = (id: number) => {
    const recordId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('stations', { id: recordId });
    if (isLoading) return null;

    // Get the data.sensor_link.sensor_id for the
    // data.sensor_link.sensor_position that corresponds to the id param
    const sensor_link = data.sensor_link.find(link => link.sensor_position == id);
    if (sensor_link) {
        const sensor = data.sensors.find(sensor => sensor.id === sensor_link.sensor_id);
        if (sensor.parameter) {
            return `${id}: ${sensor.parameter.name}`;
        }
    }
    return `${id}: N/A`;

}


const HighFrequencyPlot = () => {
    // Generate 100 data points over 2 years
    const startDate = new Date('2024-01-01'); // Start date
    const endDate = new Date('2026-01-01'); // End date
    const interval = (endDate - startDate) / 99; // Calculate interval between each point

    // Generate time series data with evenly spaced timestamps and random values for demonstration
    const timeSeriesData = Array.from({ length: 100 }, (_, index) => {
        const timestamp = new Date(startDate.getTime() + index * interval).toISOString().split('T')[0];
        const value = Math.random() * 100; // Random value for demonstration
        return { timestamp, value };
    });

    // Extract x and y values from time series data
    const xValues = timeSeriesData.map(dataPoint => dataPoint.timestamp);
    const yValues = timeSeriesData.map(dataPoint => dataPoint.value);

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'blue' }, // Customize marker color if needed
                },
            ]}
            layout={{
                width: 1000, height: 400, title: 'Sensor high frequency time series',
                xaxis: {
                    rangeselector: {
                        buttons: [
                            {
                                count: 1,
                                label: '1m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 6,
                                label: '6m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            { step: 'all' }
                        ]
                    },
                    rangeslider: { range: [startDate, endDate] },
                    range: ["2024-01-01", "2024-06-01"],
                    type: 'date'
                }
            }}

        />
    )
}

const StationSensorDetails = props => {
    // The sensor details layout lives here..!
    const recordId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('stations', { id: recordId });
    if (isLoading) return null;

    // Search the sensor array, for the station_link that matches props sensor_position
    const sensor = data.sensors.find(
        sensor => sensor.station_link.sensor_position == props.sensor_position
    );

    const currentCorrectionEq = (record) => {
        console.log(record);
        if (record.calibrations.length === 0) return 'N/A';
        return `y = ${record.calibrations[0].slope}*bytes + ${record.calibrations[0].intercept}`;
    }


    return (
        <RecordContextProvider value={sensor}>
            <h3>Installed sensor: </h3>
            <SimpleShowLayout >
                <Grid container >
                    <Grid item xs={4}>
                        <Labeled>
                            <TextField
                                source="model"
                                label="Sensor model"
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <DateField
                                label="Install date"
                                source="station_link.installed_on"
                                sortable={false}
                                showTime={true}
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <DateField // Assumes list is sorted by date
                                label="Last calibration date"
                                source="calibrations[0].calibrated_on"
                                sortable={false}
                                showTime={true}
                                emptyText='Never calibrated'
                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <TextField
                                source="field_id"
                                label="Field ID"

                            />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <TextField source="serial_number" />
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <FunctionField
                                label="Current correction eq."
                                render={currentCorrectionEq}
                            />
                        </Labeled>
                    </Grid>
                </Grid>
                <ArrayField source="calibrations">
                    <Datagrid
                        bulkActionButtons={false}
                        style={{ tableLayout: 'fixed', width: '100%' }}>
                        <DateField
                            source="calibrated_on"
                            label="Calibrated On"
                            showTime={true}
                            sortable={false}
                        />
                        <NumberField
                            source="intercept"
                            label="Intercept"
                            sortable={false}
                        />
                        <NumberField
                            source="slope"
                            label="Slope"
                            sortable={false}
                        />
                        <NumberField
                            source="min_range"
                            label="Min Range"
                            sortable={false}
                        />
                        <NumberField
                            source="max_range"
                            label="Max Range"
                            sortable={false}
                        />


                    </Datagrid>
                </ArrayField>
                <HighFrequencyPlot />
            </SimpleShowLayout>
        </RecordContextProvider>
    );

}
const ModifySensorAssignment = (props) => {
    const record = useRecordContext();
    const { permissions } = usePermissions();
    const refresh = useRefresh();
    // Get the station_sensor link from the record.sensor_link array. If it
    // is null, there is no sensor assigned to this station position.
    const sensor_link = record.sensor_link.find(
        link => link.sensor_position == props.sensor_position
    );


    const DeleteAssignmentButton = () => {
        const refresh = useRefresh();
        const record = useRecordContext();
        const notify = useNotify();
        const [deleteOne, { isLoading }] = useDelete(
            'station_sensors',
            { id: sensor_link.id },
            {
                onSuccess: (data) => {
                    refresh();
                    notify('Assignment deleted');
                },
                onError: (error) => {
                    notify(`Assignment deletion error: ${error.message}`, { type: 'error' });
                },
            }
        );

        return <><Button label="Remove Assignment" startIcon={<ClearIcon fontSize='inherit' />} onClick={() => deleteOne()} disabled={isLoading} /></>;
    };

    if (sensor_link === undefined) {
        return (
            <TopToolbar>
                {permissions === 'admin' && <CreateButton
                    label="Assign sensor"
                    resource="station_sensors"
                    state={{
                        record: {
                            station_id: record.id,
                            sensor_position: props.sensor_position
                        }
                    }}
                />}
            </TopToolbar>
        );
    } else {
        return (
            <TopToolbar>
                {permissions === 'admin' && <><EditButton
                    label="Manage sensor assignment"
                    resource="station_sensors"
                    record={{ id: sensor_link.id }}
                /><DeleteAssignmentButton /></>}
            </TopToolbar>

        );
    }

}

const StationShow = () => {
    return (
        <Show actions={<StationShowActions />} sx={{
            width: 0.75
        }}>

            <SimpleShowLayout >
                <FunctionField
                    render={record => `${record.name} (${record.acronym})`}
                    label={false}
                    sx={{
                        color: 'text.primary',
                        fontSize: 26,
                        fontWeight: 'bold'
                    }}
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

            </SimpleShowLayout>
            <TabbedShowLayout
                tabs={
                    <TabbedShowLayoutTabs
                        variant="scrollable"
                        scrollButtons={true}
                        allowScrollButtonsMobile={true}
                    />}
            >
                {Array.from({ length: 15 }, (_, index) => {
                    return (
                        <TabbedShowLayout.Tab
                            key={index + 1}
                            label={tabValue(index + 1)}
                            path={`body${index + 1}`}
                        >
                            <ModifySensorAssignment sensor_position={index + 1} />
                            <StationSensorDetails sensor_position={index + 1} />
                        </TabbedShowLayout.Tab>
                    )
                })}
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;