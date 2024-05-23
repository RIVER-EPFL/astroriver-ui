
import {
    useGetRecordId,
    useRecordContext,
    RecordContextProvider,
    Loading,
    SimpleShowLayout,
    Labeled,
    TextField,
    DateField,
    FunctionField,
    ArrayField,
    Datagrid,
    NumberField,
    useCreatePath,
    Link,
} from 'react-admin';
import { HighFrequencyPlot } from '../Plots';
import { Grid } from '@mui/material';
import { stopPropagation } from 'ol/events/Event';

export const StationSensorDetails = (props) => {
    // The sensor details layout lives here..!

    const currentCorrectionEq = (record) => {
        if (record.calibrations.length === 0) return 'N/A';
        return `y = ${record.calibrations[0].slope}*bytes + ${record.calibrations[0].intercept}`;
    }

    if (props.sensorRecord === false) { return <h3>No sensor assigned </h3> };

    const SensorNameField = () => {
        const record = useRecordContext();
        const createPath = useCreatePath();
        const path = createPath({
            resource: 'sensors',
            type: 'show',
            id: record.id,
        });
        return (
            <Link to={path} onClick={stopPropagation}>
                <TextField source="model" />
            </Link>
        );
    }
    const FieldWrapper = ({ children, label }) => children;

    // Installed date is the latest sensor_link sorted by installed_on desc
    // Sort the station_link list and get the most recent
    const installed_on = (record) => {
        if (record.station_link.length === 0) return 'N/A';
        // Sort the list by installed_on date and use the first element
        record.station_link.sort(
            (a, b) => new Date(b.installed_on) - new Date(a.installed_on)
        );
        const date = new Date(record.station_link[0].installed_on);
        return (`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)


    }

    console.log("props.sensorRecord", props.sensorRecord)

    return (
        <RecordContextProvider value={props.sensorRecord}>
            <h3>Installed sensor: </h3>
            <SimpleShowLayout >
                <Grid container >
                    <Grid item xs={4}>
                        <Labeled>
                            <FieldWrapper label="Model">
                                <SensorNameField />
                            </FieldWrapper>
                        </Labeled>
                    </Grid>
                    <Grid item xs={4}>
                        <Labeled>
                            <FunctionField
                                label="Installed on"
                                render={installed_on}
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

export default StationSensorDetails;