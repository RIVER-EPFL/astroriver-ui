import {
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    ReferenceField,
    TabbedShowLayout,
    Datagrid,
    List,
    useRecordContext,
    ArrayField,
    FunctionField,
    BooleanField,
    EditButton,
    TopToolbar,
    DeleteButton,
    usePermissions,
    DateField,
    ReferenceManyCount,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import {
    LineChart,
    Line,
    Label,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';


const AtrocastDeviceShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}

const AtrocastDeviceShow = () => (
    <Show actions={<AtrocastDeviceShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" label="ID (Astrocast GUID)" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceManyCount
                label="Messages"
                reference="astrocast_messages"
                target="deviceGuid"
                link
            />
            <NumberField source="lastLatitude" />
            <NumberField source="lastLongitude" />
            <FunctionField source="deviceType" render={record => `${record.deviceType} (${record.deviceTypeName})`} />
            <NumberField source="deviceState" />
            <DateField source="disabledUntilDate" />
            <TextField source="modelNumber" />
            <TextField source="serialNumber" />
            <TextField source="firmwareVersion" />
            <TextField source="componentModelNumber" />
            <TextField source="componentSerialNumber" />
            <TextField source="componentFirmwareVersion" />
            <NumberField source="protocolVersion" />

            <DateField
                source="lastMessageDate"
                showTime={true}
            />
            <DateField
                source="lastCommandDate"
                showTime={true}
            />
            <DateField
                source="lastLocationDate"
                showTime={true}
            />
            <BooleanField source="fixedGeolocation" />
        </SimpleShowLayout>
    </Show >
);

export default AtrocastDeviceShow;