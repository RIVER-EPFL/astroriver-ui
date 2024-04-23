/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    ReferenceInput,
    SelectInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    useGetRecordId,
    useGetOne,
} from 'react-admin';


const StationEdit = () => {
    return (
        <Edit redirect="show">
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" label="Station name" />
                <TextInput source="acronym" label="Station acronym" />
                <TextInput source="catchment_name" />
                <TextInput source="description" />
                <NumberInput source="x_coordinate" label="X coordinate" />
                <NumberInput source="y_coordinate" label="Y coordinate" />
                <ReferenceInput
                    source="associated_astrocast_device"
                    reference="astrocast_devices"
                >
                    <SelectInput
                        label="Astrocast Device"
                        source="associated_astrocast_device"
                        optionText={(record) => `${record.name} (${record.deviceTypeName})`}
                        validate={required()}
                    />
                </ReferenceInput>

            </SimpleForm>
        </Edit>
    )
};

export default StationEdit;
