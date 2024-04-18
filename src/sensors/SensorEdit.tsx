/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    TextField,
} from 'react-admin';

const SensorEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput disabled label="Id" source="id" />
                <ReferenceInput
                    source="parameter_id"
                    reference="sensor_parameters"
                >
                    <SelectInput
                        label="Parameter"
                        source="parameter_id"
                        optionText={(record) => `${record.name} (${record.unit})`}
                        validate={required()}
                    />
                </ReferenceInput>
                <TextInput source="serial_number" validate={[required()]} />
                <TextInput source="model" validate={[required()]} />
                {/* <DateTimeInput source="calibrated_on" validate={[required()]} /> */}
                {/* <NumberInput source="slope" />
                <NumberInput source="intercept" />
                <NumberInput source="min_range" />
                <NumberInput source="max_range" /> */}
            </SimpleForm>
        </Edit>
    )
};

export default SensorEdit;
