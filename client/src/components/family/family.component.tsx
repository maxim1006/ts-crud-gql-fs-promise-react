import React, { memo } from 'react';
import { ApolloError } from '@apollo/client/errors';
import FamilyMember from './member/family-member.component';
import { GetFamily, GetFamily_family_members } from './__generated__/GetFamily';

type FamilyProps = {
    data: GetFamily;
    loading: boolean;
    error?: ApolloError;
    onRemove?: (member: GetFamily_family_members) => void;
    onUpdate?: (member: GetFamily_family_members) => void;
};

const Family = memo<FamilyProps>(({ data, loading, error, onRemove, onUpdate }) => {
    if (loading) return <>Loading...</>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            <ul>
                {data.family?.members?.map(member => {
                    if (member) {
                        return (
                            <li key={member?.id}>
                                <FamilyMember onUpdate={onUpdate} onRemove={onRemove} member={member} />
                            </li>
                        );
                    }

                    return null;
                })}
            </ul>
        </>
    );
});

export default Family;
