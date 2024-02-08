/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const StationEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <TextInput source="name" />
                <TextInput source="description" />
                <TextInput source="comment" />
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
