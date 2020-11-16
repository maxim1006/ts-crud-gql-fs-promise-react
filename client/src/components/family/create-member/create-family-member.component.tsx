import React, { memo, useRef, useState } from 'react';

type CreateFamilyMemberProps = {
    onCreate: (member: { name: string; age: number }) => void;
};

const CreateFamilyMember = memo<CreateFamilyMemberProps>(({ onCreate }) => {
    const [error, setError] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement>(null!);
    const ageRef = useRef<HTMLInputElement>(null!);

    return (
        <form
            style={{ margin: '20px 0' }}
            onSubmit={e => {
                e.preventDefault();

                if (!nameRef.current.value.trim() || !ageRef.current.value.trim()) {
                    setError(true);
                    return false;
                } else {
                    setError(false);
                }

                const name = nameRef.current.value;
                const ageRefValue = parseInt(ageRef.current.value, 10);
                const age = isNaN(ageRefValue) ? 0 : ageRefValue;

                onCreate({
                    name,
                    age,
                });
            }}
        >
            <div>
                <label>
                    Name: <input ref={nameRef} type="text" name="name" />
                </label>
            </div>
            <div>
                <label>
                    Age: <input ref={ageRef} type="text" name="age" />
                </label>
            </div>
            <div style={{ color: 'red' }} hidden={!error}>
                Name or age cant be empty
            </div>
            <button type="submit">Create member</button>
        </form>
    );
});

export default CreateFamilyMember;
