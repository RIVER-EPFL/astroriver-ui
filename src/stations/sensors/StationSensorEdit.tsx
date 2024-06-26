/* eslint react/jsx-key: off */
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    DateTimeInput,
    ReferenceInput,
    SelectInput,
    Toolbar,
    SaveButton,
} from 'react-admin';


const EditToolbar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);


const SensorEdit = () => {
    return (
        <Edit>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput disabled label="Id" source="id" />
                <ReferenceInput
                    source="sensor_id"
                    reference="sensors"
                    filter={{ station_link: false }}
                >
                    <SelectInput
                        label="Sensor"
                        source="sensor_id"
                        optionText={(record) => `${record.model}:${record.field_id} (${record.parameter.name})`}
                        validate={required()}
                        helperText="Sensors already attached to a station are not listed. Remove them from the station first."
                    />
                </ReferenceInput>
                <ReferenceInput
                    source="station_id"
                    reference="stations"
                >
                    <SelectInput
                        label="Station"
                        source="station_id"
                        optionText={(record) => `${record.name} (${record.acronym})`}
                        validate={required()}
                    />
                </ReferenceInput>
                <SelectInput
                    source="sensor_position"
                    helperText={false}
                    validate={[required()]}
                    choices={[
                        { id: '1', name: '1' },
                        { id: '2', name: '2' },
                        { id: '3', name: '3' },
                        { id: '4', name: '4' },
                        { id: '5', name: '5' },
                        { id: '6', name: '6' },
                        { id: '7', name: '7' },
                        { id: '8', name: '8' },
                        { id: '9', name: '9' },
                        { id: '10', name: '10' },
                        { id: '11', name: '11' },
                        { id: '12', name: '12' },
                        { id: '13', name: '13' },
                        { id: '14', name: '14' },
                        { id: '15', name: '15' },
                        { id: '16', name: '16' },
                        { id: '17', name: '17' },
                        { id: '18', name: '18' },
                        { id: '19', name: '19' },
                        { id: '20', name: '20' },
                        { id: '21', name: '21' },
                        { id: '22', name: '22' },
                        { id: '23', name: '23' },
                        { id: '24', name: '24' },
                    ]}
                />
                <DateTimeInput
                    source="installed_on"
                    validate={[required()]}
                />
            </SimpleForm>
        </Edit>
    )
};

export default SensorEdit;
