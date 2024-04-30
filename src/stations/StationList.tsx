import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    FunctionField,
    DateField,
} from "react-admin";
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const StationListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const StationList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List storeKey={false}
            actions={<StationListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <TextField source="name" />
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
            </Datagrid>
        </List >

    )
};

export default StationList;
