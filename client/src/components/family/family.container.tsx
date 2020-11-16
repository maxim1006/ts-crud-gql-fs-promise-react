import React, { memo, useCallback } from 'react';
import { gql, Reference, useMutation, useQuery } from '@apollo/client';
import Family from './family.component';
import { commonUtilsOmitTypeName } from '../../common.utils';
import CreateFamilyMember from './create-member/create-family-member.component';
import { GET_FAMILY, GET_FAMILY_family_members } from './__generated__/GET_FAMILY';

type FamilyContainerProps = {};

export const GET_FAMILY_GQL = gql`
    query GET_FAMILY_GQL {
        family {
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
            deleted
            id
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

const FamilyContainer = memo<FamilyContainerProps>(() => {
    const { data, loading, error } = useQuery<GET_FAMILY>(
        GET_FAMILY_GQL
    );

    const [
        createMember,
    ] = useMutation(CREATE_FAMILY_MEMBER, {
        update(cache, { data: { createFamilyMember } }) {
            cache.modify({
                fields: {
                    family(existingCommentRefs) {
                        // add all family that get from BE to cache
                        cache.writeQuery({
                            query: GET_FAMILY_GQL,
                            data: {
                                family: createFamilyMember,
                            },
                        });

                        return existingCommentRefs;
                    },
                },
            });
        },
    });
    const [removeMember] = useMutation(DELETE_FAMILY_MEMBER, {
        update(cache, { data: { deleteFamilyMember } }) {
            cache.modify({
                fields: {
                    family(existingCommentRefs, { readField }) {
                        const members = existingCommentRefs.members.filter((i: Reference) => {
                            return readField('id', i) !== deleteFamilyMember.id;
                        });

                        return {
                            ...existingCommentRefs,
                            members,
                        };
                    },
                },
            });
        },
    });

    const [updateMember] = useMutation(UPDATE_FAMILY_MEMBER);

    const onCreate = useCallback(
        ({ name, age }) => {
            createMember({ variables: { name, age } });
        },
        [createMember]
    );

    const onUpdate = useCallback(
        (member: GET_FAMILY_family_members) => {
            updateMember({ variables: { input: commonUtilsOmitTypeName(member) } });
        },
        [updateMember]
    );

    const onRemove = useCallback(
        (member: GET_FAMILY_family_members) => {
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
