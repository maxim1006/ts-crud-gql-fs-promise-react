import React, { memo, useState } from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { FamilyMemberProps } from './types';

const FamilyMember = memo<FamilyMemberProps>(({ member, onRemove, onUpdate }) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editNameState, setEditNameState] = useState<string>('');
    const [editAgeState, setEditAgeState] = useState<string>('');
    
    const onCurrentEditSubmit = () => {
        setEditMode(false);
        onUpdate &&
            onUpdate({
                ...member,
                name: editNameState,
                age: parseInt(editAgeState, 10),
            });
    };

    return (
        <View>
            {editMode ? (
                <>
                    <View>
                        <Text>Name: </Text>
                        <TextInput value={editNameState} onChangeText={setEditNameState} style={styles.input} />
                    </View>
                    <View>
                        <Text>Age: </Text>
                        <TextInput value={editAgeState} onChangeText={setEditAgeState} keyboardType="numeric" style={styles.input} />
                    </View>
                    <Button
                        title="submit"
                        onPress={onCurrentEditSubmit}
                    />
                </>
            ) : (
                <>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text>{`Name: ${member.name}    `}</Text>
                        <Text>{`Age: ${member.age}`}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button 
                            title="remove"
                            onPress={() => onRemove && onRemove(member)}
                        />
                        <Button
                            title="edit"
                            onPress={() => {
                                setEditMode(true);
                                setEditAgeState(String(member.age));
                                setEditNameState(member.name);
                            }}
                        />
                    </View>
                </>
            )}
        </View>
    )
});


const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      flexGrow: 1,
    },
  });


export default FamilyMember;
