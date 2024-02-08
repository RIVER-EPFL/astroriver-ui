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
    BooleanField,
    ReferenceManyField,
    Datagrid,
    useRecordContext,
    WithRecord,
    useGetRecordId,
} from 'react-admin'; // eslint-disable-line import/no-unresolved

const StationShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}


const StationShow = () => {
    const recordId = useGetRecordId();
    console.log("recordId", recordId);
    return (
        <Show actions={<StationShowActions />}>
            <SimpleShowLayout>
                <TextField source="name" />
                <TextField source="description" />
                <TextField source="comment" />
                <ReferenceField
                    label="Astrocast Device"
                    source="associated_astrocast_device"
                    reference="astrocast_devices"
                    link="show"
                >
                    <FunctionField
                        label="Active"
                        render={(record) => `${record.name} (${record.deviceTypeName})`}

                    />
                </ReferenceField>

                <DateField
                    label="Time added (UTC)"
                    source="time_added_utc"
                    sortable={false}
                    showTime={true}
                />

            </SimpleShowLayout>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="health status" path="body">
                    <RichTextField source="body" label={false} />
                </TabbedShowLayout.Tab>
                <TabbedShowLayout.Tab
                    label="Sensors"
                // path="comments"
                >
                    <ReferenceManyField
                        reference="astrocast_messages"
                        filter={{ deviceGuid: recordId }}
                        target="deviceGuid"
                    >
                        <Datagrid>
                            <TextField source="body" />
                            <DateField source="created_at" />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show >
    )
};


export default StationShow;