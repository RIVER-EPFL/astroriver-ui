import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    NumberField,
    DateField,
    ReferenceManyCount,
    ArrayField,
    SavedQueriesList,
    FilterLiveSearch,
    FilterList,
    FilterListItem,
    BooleanField
} from "react-admin";
import { Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const AtrocastListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const AtrocastList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List disableSyncWithLocation
            actions={<AtrocastListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                {/* <TextField source="messageGuid" />
                <TextField source="deviceGuid" /> */}
                <TextField source="decoded_data" />
                <NumberField source="messageSize" />
                <NumberField source="latitude" />
                <NumberField source="longitude" />
                <DateField
                    label="Received Date"
                    source="receivedDate"
                    // sortable={false}
                    showTime={true}
                />
                <DateField
                    label="Created Date"
                    source="createdDate"
                    // sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default AtrocastList;
