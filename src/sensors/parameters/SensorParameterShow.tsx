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
    ReferenceArrayField,
    ReferenceField,
    FunctionField,
    ReferenceManyCount,
    ArrayField,
    Datagrid,
    useRedirect,
    RaRecord,
    Identifier,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const SensorParameterShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const SensorParameterShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    const redirect = useRedirect();

    return (
        <Show actions={<SensorParameterShowActions />}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="acronym" />
                <TextField source="unit" />
                <ArrayField source="sensors" label="Associated sensors" >
                    <Datagrid
                        bulkActionButtons={false}
                        rowClick={(id: Identifier, resource: string, record: RaRecord) =>
                            redirect('show', 'sensors', record.id)
                        }>
                        <TextField source="model" />
                        <TextField source="serial_number" />

                        <ReferenceField
                            label="Assigned Station"
                            source="station_link.station_id"
                            reference="stations"
                            link="show"
                            emptyText="N/A"
                            sortable={false}
                        >
                            <FunctionField render={(record) => record.name} />
                        </ReferenceField>
                        <NumberField source="station_link.sensor_position" label="Station position" />
                    </Datagrid>
                </ArrayField>

            </SimpleShowLayout>
        </Show >
    )
};


export default SensorParameterShow;