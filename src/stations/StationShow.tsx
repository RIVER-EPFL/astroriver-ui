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
    useRefresh,
    useNotify,
    Button,
    useCreate,
    Loading,
    useRedirect,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { get } from 'http';
import { useEffect, useState } from 'react';
import { StationSensorDetails } from './sensors/StationSensorDetails';


const ModifySensorAssignment = (props) => {
    const record = useRecordContext();
    const refresh = useRefresh();

    const DeleteAssignmentButton = () => {
        const redirect = useRedirect();
        const notify = useNotify();
        const [create, { data, isLoading, loaded, error }] = useCreate(
            'station_sensors',
            {
                data: {
                    station_id: record.id,
                    sensor_id: null,
                    sensor_position: props.sensor_position
                }
            },

        );

        return <>
            <Button
                label="Remove Assignment"
                startIcon={<ClearIcon fontSize='inherit' />}
                onClick={(event) => {
                    create();
                    // notify('Assignment removed');
                    refresh();
                    event.stopPropagation();
                }
                }
            /></>;
    };


    if (props.sensorRecord === false) {
        return (
            <TopToolbar>
                <CreateButton
                    label="Assign sensor"
                    resource="station_sensors"
                    state={{
                        record: {
                            station_id: record.id,
                            sensor_position: props.sensor_position
                        }
                    }}
                />
            </TopToolbar>
        );
    } else {
        return (
            <TopToolbar>
                <><CreateButton
                    label="Replace sensor"
                    resource="station_sensors"
                    state={{
                        record: {
                            station_id: record.id,
                            sensor_position: props.sensor_position
                        }
                    }}
                /><DeleteAssignmentButton /></>

            </TopToolbar>
        );
    }
}

const tabValue = (sensorRecord, sensorPosition) => {
    // Gets the sensor and returns the tab name in the station

    if (sensorRecord === false) {
        return `${sensorPosition}: N/A`;
    }
    if (sensorRecord === null) { // Still loading
        return `${sensorPosition}: Loading`;
    }

    return `${sensorPosition}: ${sensorRecord.parameter.name}`;
}

const StationShow = () => {
    const StationShowActions = () => {
        const { permissions } = usePermissions();
        return (
            <TopToolbar>
                {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
            </TopToolbar>
        );
    }
    const getCurrentSensor = (stationID: number, sensorPosition: number) => {
        const { data, isLoading, error } = useGetOne('stations', { id: stationID });
        if (isLoading) return null;
        // Search the sensor array, for the station_link that matches the sensor
        // position sorted by date. This is the sensor that is currently installed.
        // If no sensor is installed, the sensor_link will be null.
        const sensor = data.sensors.find(
            sensor => sensor.station_link.sensor_position == sensorPosition
        );
        // Get all sensor IDs that match the sensor position
        // Get all sensor links matching the sensor position
        const sensorLinks = data.sensor_link.filter(
            link => link.sensor_position == sensorPosition
        );

        // Sort the sensor links by 'installed_on' descending
        sensorLinks.sort((a, b) => new Date(b.installed_on) - new Date(a.installed_on));

        // Get the first sensor ID after sorting (limit 1)
        const latestSensorID = sensorLinks.length > 0 ? sensorLinks[0].sensor_id : null;
        if (latestSensorID === null) {
            return false;
        } else {
            // Query for the sensor of this ID
            const { data, isLoading, error } = useGetOne('sensors', { id: latestSensorID });
            if (isLoading) return null;
            return data;
        }
    }

    const recordId = useGetRecordId();


    const tabs = Array.from({ length: 24 }, (_, index) => {
        const sensorRecord = getCurrentSensor(recordId, index + 1);

        return (
            <TabbedShowLayout.Tab
                key={index + 1}
                label={tabValue(sensorRecord, index + 1)}
                path={`body${index + 1}`}
            >
                <ModifySensorAssignment sensorRecord={sensorRecord} sensor_position={index + 1} />
                <StationSensorDetails sensorRecord={sensorRecord} />
            </TabbedShowLayout.Tab>
        )
    });

    return (
        <Show actions={<StationShowActions />} sx={{
            width: 0.5
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
                {tabs}
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;