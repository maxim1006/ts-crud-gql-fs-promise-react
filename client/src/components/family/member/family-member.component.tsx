import React, { memo, useState } from 'react';
import { GetFamily_family_members } from '../__generated__/GetFamily';

type FamilyMemberProps = {
    member: GetFamily_family_members;
    onRemove?: (member: GetFamily_family_members) => void;
    onUpdate?: (member: GetFamily_family_members) => void;
};

const FamilyMember = memo<FamilyMemberProps>(({ member, onRemove, onUpdate }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [editNameState, setEditNameState] = useState<string>('');
    const [editAgeState, setEditAgeState] = useState<string>('');

    const onCurrentEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEditMode(false);
        onUpdate &&
            onUpdate({
                ...member,
                name: editNameState,
                age: parseInt(editAgeState, 10),
            });
    };

    return (
        <>
            <p>
                Name: {member?.name} Age: {member?.age}
            </p>
            <button type="button" onClick={() => onRemove && onRemove(member)}>
                Remove
            </button>

            {editMode ? (
                <form onSubmit={onCurrentEditSubmit}>
                    <label>
                        Name
                        <input
                            value={editNameState}
                            onChange={e => setEditNameState(e.target.value)}
                            name="name"
                            type="text"
                        />
                    </label>

                    <label>
                        Age
                        <input
                            onChange={e => setEditAgeState(e.target.value)}
                            value={editAgeState}
                            name="age"
                            type="text"
                        />
                    </label>

                    <button type="submit">Submit</button>
                </form>
            ) : (
                <a
                    href="/"
                    onClick={e => {
                        e.preventDefault();
                        setEditMode(true);
                        setEditAgeState(`${member.age}` || '');
                        setEditNameState(`${member.name}` || '');
                    }}
                >
                    Edit
                </a>
            )}
        </>
    );
});

export default FamilyMember;
