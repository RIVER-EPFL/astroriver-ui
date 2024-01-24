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
    EditButton,
    TopToolbar,
    DeleteButton,
    usePermissions,
    DateField,
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


const AstrocastShowActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><EditButton /><DeleteButton /></>}
        </TopToolbar>
    );
}

const AstrocastShow = () => (
    <Show actions={<AstrocastShowActions />}>
        <SimpleShowLayout>
            <TextField source="data" label="Data (Raw base64)" />
            <TextField source="decoded_data" />
            <TextField source="id" label="Local UUID4" />
            <TextField source="messageGuid" label="Astrocast message GUID" />
            <TextField source="deviceGuid" label="Astrocast device GUID" />


            <NumberField source="latitude" />
            <NumberField source="longitude" />

            <DateField
                label="Requested at (from local API to Astrocast API)"
                source="requested_at"

                showTime={true}
            />
            <DateField
                label="Received Date (from satellite to Astrocast server)"
                source="receivedDate"
                showTime={true}
            />
            <DateField
                label="Created Date (Queued by sensor)"
                source="createdDate"
                showTime={true}
            />

            <NumberField source="callbackDeliveryStatus" />
            <NumberField source="messageSize" />
        </SimpleShowLayout>
    </Show >
);

export default AstrocastShow;