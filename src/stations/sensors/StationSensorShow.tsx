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
    NumberField,
    FunctionField,
    ReferenceField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const SensorShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const StationSensorShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<SensorShowActions />}>
            <SimpleShowLayout>
                <ReferenceField
                    label="Station"
                    source="station_id"
                    reference="stations"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <TextField source="name" />

                </ReferenceField>
                <NumberField source="sensor_position" />
                <ReferenceField
                    label="Parameter"
                    source="sensor.parameter_id"
                    reference="sensor_parameters"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField render={(record) => `${record.name} (${record.unit})`} />
                </ReferenceField>
                <TextField source="sensor.serial_number" />
                <DateField
                    label="Installed on"
                    source="installed_on"
                    sortable={false}
                    showTime={true}
                />
            </SimpleShowLayout>
        </Show >
    )
};


export default StationSensorShow;