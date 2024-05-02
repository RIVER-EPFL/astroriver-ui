
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
} from 'react-admin';
import { HighFrequencyPlot } from '../Plots';
import { Grid } from '@mui/material';

export const StationSensorDetails = (props) => {
    // The sensor details layout lives here..!
    console.log("PROPS", props);
    const currentCorrectionEq = (record) => {
        if (record.calibrations.length === 0) return 'N/A';
        return `y = ${record.calibrations[0].slope}*bytes + ${record.calibrations[0].intercept}`;
    }

    return (
        <RecordContextProvider value={props.sensorRecord}>
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

export default StationSensorDetails;