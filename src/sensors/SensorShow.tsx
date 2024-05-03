import {
    Show,
    SimpleShowLayout,
    TextField,
    EditButton,
    TopToolbar,
    DeleteButton,
    usePermissions,
    DateField,
    useGetRecordId,
    ReferenceField,
    FunctionField,
    CreateButton,
    useGetOne,
    NumberField,
    ArrayField,
    Datagrid,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const SensorShowActions = () => {
    const { permissions } = usePermissions();
    const sensorId = useGetRecordId();
    const { data, isLoading, error } = useGetOne('sensors', { id: sensorId });
    if (isLoading) return null;
    console.log('data', data);
    return (
        <TopToolbar>
            {permissions === 'admin' && <>
                {data.station_link === null && <CreateButton
                    label="Assign to Station"
                    resource="station_sensors"
                    state={{ record: { sensor_id: sensorId } }}
                />}
                {data.station_link !== null && <EditButton
                    label="Manage station assignment"
                    resource="station_sensors"
                    record={{ id: data.station_link.id }}
                />}
                <EditButton />
                <DeleteButton /></>}
        </TopToolbar >
    );
}


const SensorShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<SensorShowActions />}>
            <SimpleShowLayout>
                <TextField source="model" />
                <TextField source="field_id" label="Field ID (to identify this sensor in control messages)" />
                <TextField source="serial_number" />
                <ReferenceField
                    label="Parameter"
                    source="parameter_id"
                    reference="sensor_parameters"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField render={(record) => `${record.name} (${record.unit})`} />
                </ReferenceField>
                <ReferenceField
                    label="Assigned Station"
                    source="current_assignment.station_id"
                    reference="stations"
                    link="show"
                    emptyText="N/A"
                >
                    <FunctionField
                        label="Active"
                        render={(record) => `${record.name}`}

                    />
                </ReferenceField>
                <DateField
                    label="Last Updated"
                    source="calibrated_on"
                    sortable={false}
                    showTime={true}
                />
                <ArrayField source="calibrations">
                    <Datagrid
                        bulkActionButtons={false}
                        style={{ tableLayout: 'fixed', width: '50%' }}>
                        <DateField
                            source="calibrated_on"
                            label="Calibrated On"
                            showTime={true}
                        />
                        <NumberField
                            source="intercept"
                            label="Intercept"
                        />
                        <NumberField
                            source="slope"
                            label="Slope"
                        />
                        <NumberField
                            source="min_range"
                            label="Min Range"
                        />
                        <NumberField
                            source="max_range"
                            label="Max Range"
                        />


                    </Datagrid>
                </ArrayField>

            </SimpleShowLayout>
        </Show >
    )
};


export default SensorShow;