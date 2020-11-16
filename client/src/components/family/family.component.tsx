import React, { memo } from 'react';
import { ApolloError } from '@apollo/client/errors';
import FamilyMember from './member/family-member.component';
import { GET_FAMILY, GET_FAMILY_family_members } from './__generated__/GET_FAMILY';

type FamilyProps = {
    data: GET_FAMILY;
    loading: boolean;
    error?: ApolloError;
    onRemove?: (member: GET_FAMILY_family_members) => void;
    onUpdate?: (member: GET_FAMILY_family_members) => void;
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
