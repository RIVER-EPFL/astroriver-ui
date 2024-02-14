/* eslint react/jsx-key: off */
import * as React from 'react';
import { useMutation } from 'react-query';
import {
    Create,
    SimpleForm,
    TextField,
    TextInput,
    NumberInput,
    required,
    ReferenceInput,
    SelectInput,

} from 'react-admin';


const StationCreate = () => {

    return (
        <Create redirect="list">
            <SimpleForm >
                <TextField source="id" />
                <TextInput source="name" label="Station name" validate={[required()]} />
                <TextInput source="acronym" label="Station acronym" />
                <TextInput source="catchment_name" label="Catchment name" />
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
                <TextInput source="description" multiline />
                <NumberInput source="x_coordinate" label="X coordinate" />
                <NumberInput source="y_coordinate" label="Y coordinate" />
            </SimpleForm>
        </Create>
    )
};

export default StationCreate;
