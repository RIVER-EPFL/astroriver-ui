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
            <TextField source="id" />
            <TextField source="messageGuid" />
            <TextField source="deviceGuid" />
            <TextField source="data" />
            <NumberField source="messageSize" />
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

        </SimpleShowLayout>
    </Show >
);

export default AstrocastShow;