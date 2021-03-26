import React, { memo, useRef, useState } from 'react';
import {TextInput, View, Text, Button, StyleSheet} from 'react-native';
import { CreateFamilyMemberProps } from './types';

const CreateFamilyMember = memo<CreateFamilyMemberProps>(({ onCreate }) => {
    const [name, onChangeName] = React.useState('');
    const [age, onChangeAge] = React.useState('');
    const [error, setError] = React.useState('');
    const onSubmit = React.useCallback(() => {
        if (!name || !age) {
            setError("Name or age cant be empty");
            return;
        }
        setError('');
        onCreate({
            name,
            age: Number(age),
        });
    }, [age, name, error])
    return (
        <View>
            <View>
                <Text>Name: </Text>
                <TextInput value={name} onChangeText={onChangeName} style={styles.input} />
            </View>
            <View>
                <Text>Age: </Text>
                <TextInput value={age} onChangeText={onChangeAge} keyboardType="numeric" style={styles.input} />
            </View>
            {!!error && <Text style={{color: '#FF0000'}}>{error}</Text>}
            <Button
                title="Create member"
                onPress={onSubmit}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      flexGrow: 1,
    },
  });

export default CreateFamilyMember;