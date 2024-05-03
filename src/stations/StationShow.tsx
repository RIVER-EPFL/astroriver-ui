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



const StationShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}

const DeleteAssignmentButton = (props) => {
    const refresh = useRefresh();
    const notify = useNotify();
    console.log("PROPS RECORD", props.record)
    const [create, { data, isLoading, loaded, error }] = useCreate(
        'station_sensors',
        {
            data: {
                station_id: props.record.current_assignment.station_id,
                sensor_id: null,
                sensor_position: props.sensorPosition
            }
        },
        {
            onSuccess: (data) => {
                refresh();
                notify('Assignment removed');
            },
            onError: (error) => {
                notify(`Assignment creation error: ${error.message}`, { type: 'error' });
            },
        }
    );

    return <>
        <Button
            label="Remove Assignment"
            startIcon={<ClearIcon fontSize='inherit' />}
            onClick={() => create()}
        />
    </>;
};

const ModifySensorAssignment = (props) => {
    if (props.sensorRecord === false) {
        return (
            <TopToolbar>
                <CreateButton
                    label="Assign sensor"
                    resource="station_sensors"
                    state={{
                        record: {
                            station_id: props.stationID,
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
                            station_id: props.stationID,
                            sensor_position: props.sensor_position
                        }
                    }}
                /><DeleteAssignmentButton record={props.sensorRecord} sensorPosition={props.sensor_position} /></>
            </TopToolbar>
        );
    }
}

const StationShow = () => {
    const recordId = useGetRecordId();
    const record = useGetOne('stations', { id: recordId });

    const getCurrentSensor = (record, sensorPosition) => {
        // Gets the sensor record for the sensor with the latest installation date

        // Get all sensor links matching the sensor position
        const sensorLinks = record.data.sensor_link.filter(
            link => link.sensor_position == sensorPosition
        );

        // Sort the sensor links by 'installed_on' descending
        sensorLinks.sort((a, b) => new Date(b.installed_on) - new Date(a.installed_on));

        // Get the first sensor ID after sorting (limit 1)
        const latestSensorID = sensorLinks.length > 0 ? sensorLinks[0].sensor_id : null;

        if (latestSensorID === null) {
            return false;
        } else {
            const sensor = record.data.sensors.find(
                sensor => sensor.id == latestSensorID
            );
            return sensor;
        }
    }


    const tabs = Array.from({ length: 24 }, (_, index) => {
        return getCurrentSensor(record, index + 1);
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
                {tabs.map((sensorRecord, index) => (
                    <TabbedShowLayout.Tab
                        key={index + 1}
                        label={
                            sensorRecord === false
                                ? `${index + 1}: N/A`
                                : sensorRecord === null
                                    ? `${index + 1}: Loading`
                                    : `${index + 1}: ${sensorRecord.parameter.name}`
                        }
                    >
                        <ModifySensorAssignment
                            stationID={recordId}
                            sensorRecord={sensorRecord}
                            sensor_position={index + 1}
                        />
                        <StationSensorDetails sensorRecord={sensorRecord} />
                    </TabbedShowLayout.Tab>
                ))}

            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;