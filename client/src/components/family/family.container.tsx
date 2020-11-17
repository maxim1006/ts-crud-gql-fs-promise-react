import React, { memo, useCallback } from 'react';
import { gql, Reference, useMutation, useQuery } from '@apollo/client';
import Family from './family.component';
import { commonUtilsOmitTypeName } from '../../common.utils';
import CreateFamilyMember from './create-member/create-family-member.component';
import { GetFamily, GetFamily_family_members } from './__generated__/GetFamily';
import { cache } from '../../gql/gql';

type FamilyContainerProps = {};

export const GET_FAMILY = gql`
    query GetFamily {
        family {
            id
            members {
                id
                age
                name
            }
            errors {
                message
                field
            }
        }
    }
`;

const DELETE_FAMILY_MEMBER = gql`
    mutation DeleteFamilyMember($id: String!) {
        deleteFamilyMember(id: $id) {
            id
            members {
                id
                age
                name
            }
            errors {
                message
                field
            }
        }
    }
`;

const UPDATE_FAMILY_MEMBER = gql`
    mutation UpdateFamilyMember($input: FamilyMemberInput!) {
        updateFamilyMember(input: $input) {
            id
            members {
                id
                age
                name
            }
            errors {
                field
                message
            }
        }
    }
`;

const CREATE_FAMILY_MEMBER = gql`
    mutation CreateFamilyMember($name: String!, $age: Int!) {
        createFamilyMember(name: $name, age: $age) {
            id
            members {
                id
                age
                name
            }
            errors {
                message
                field
            }
        }
    }
`;

const FamilyContainer = memo<FamilyContainerProps>(() => {
    const { data, loading, error } = useQuery<GetFamily>(
        GET_FAMILY
    );

    // квери и мутации теперь смотрят на одну и ту же сущность, и автоматически синхронизируются
    const [createMember] = useMutation(CREATE_FAMILY_MEMBER);
    const [removeMember] = useMutation(DELETE_FAMILY_MEMBER);
    const [updateMember] = useMutation(UPDATE_FAMILY_MEMBER);

    const onCreate = useCallback(
        ({ name, age }) => {
            createMember({ variables: { name, age } });
        },
        [createMember]
    );

    const onUpdate = useCallback(
        (member: GetFamily_family_members) => {
            updateMember({ variables: { input: commonUtilsOmitTypeName(member) } });
        },
        [updateMember]
    );

    const onRemove = useCallback(
        (member: GetFamily_family_members) => {
            removeMember({ variables: { id: member.id } });
        },
        [removeMember]
    );

    if (loading) return <>Loading...</>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <>
            <CreateFamilyMember onCreate={onCreate} />
            <Family onRemove={onRemove} onUpdate={onUpdate} data={data} loading={loading} error={error} />
        </>
    );
});

export default FamilyContainer;
