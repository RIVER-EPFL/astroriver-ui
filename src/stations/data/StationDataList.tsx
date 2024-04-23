import {
    List,
    Datagrid,
    TextField,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    DateField,
    NumberField,
    BooleanField,
    ReferenceField,
    FunctionField,
} from "react-admin";
import Brightness1TwoToneIcon from '@mui/icons-material/Brightness1TwoTone';
const SensorListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

const StationDataList = () => {
    const { permissions } = usePermissions();

    // Set to green icon
    const TrueIcon = () => <Brightness1TwoToneIcon color="success" />;
    // Set to red icon
    const FalseIcon = () => <Brightness1TwoToneIcon color="error" />; TrueIcon

    return (
        <List disableSyncWithLocation
            actions={<SensorListActions />}
            perPage={25}
        >
            <Datagrid
                bulkActionButtons={permissions === 'admin' ? true : false}
                rowClick="show"
            >
                <DateField
                    source="time"
                    sortable={false}
                    showTime={true}
                />
                <BooleanField source="high_resolution" />
                <NumberField source="value" />
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
                <ReferenceField
                    label="Sensor"
                    source="sensor_id"
                    reference="sensors"
                    link="show"
                    emptyText="N/A"
                    sortable={false}
                >
                    <FunctionField
                        render={
                            (record) => `${record.model} (${record.serial_number})`
                        }
                    />
                </ReferenceField>
                <DateField
                    source="last_updated"
                    sortable={false}
                    showTime={true}
                />
            </Datagrid>
        </List >

    )
};

export default StationDataList;
