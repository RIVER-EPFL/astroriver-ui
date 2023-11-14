import {
    List,
    Datagrid,
    TextField,
    ReferenceManyCount,
    useGetList,
    usePermissions,
    TopToolbar,
    CreateButton,
    ExportButton,
    ArrayField,
    Count,
} from "react-admin";
import { LocationFieldAreas } from '../Map';


const AreaListActions = () => {
    const { permissions } = usePermissions();
    return (
        <TopToolbar>
            {permissions === 'admin' && <><CreateButton /></>}
            <ExportButton />
        </TopToolbar>
    );
}

export const AreaList = () => {
    const { data, total, isLoading, error } = useGetList(
        'areas', {}
    );

    if (isLoading) return <p>Loading areas...</p>;
    console.log(data);
    return (
        <List actions={<AreaListActions />}>
            <LocationFieldAreas
                rowClick="show"
                areas={data} />
            <Datagrid rowClick="show">
                <TextField source="name" />
                <TextField source="description" />
                <ReferenceManyCount
                    label="Sensors"
                    reference="sensors"
                    target="area_id"
                    link
                />
            </Datagrid>
        </List>
    );
};



export default AreaList;
