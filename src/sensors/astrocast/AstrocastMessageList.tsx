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
    BooleanField,
    FunctionField,
} from "react-admin";
import { Card, CardContent } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const AtrocastMessageListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const AtrocastMessageList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List disableSyncWithLocation
            actions={<AtrocastMessageListActions />}
            perPage={25}
            sort={{ field: 'createdDate', order: 'DESC' }}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <DateField
                    label="Created Date"
                    source="createdDate"
                    showTime={true}
                />
                <TextField source="decoded_data" sortable={false} />
                <NumberField source="messageSize" />
                <ReferenceField
                    label="Astrocast Device"
                    source="deviceGuid"
                    reference="astrocast_devices"
                    link="show"
                >
                    <FunctionField
                        label="Active"
                        render={(record) => `${record.name} (${record.deviceTypeName})`}

                    />
                </ReferenceField>
            </Datagrid>
        </List >

    )
};

export default AtrocastMessageList;
