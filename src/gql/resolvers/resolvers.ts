import { readFileJSON, writeFileJSON } from '../../utils/fs-utils';
import { ErrorModel } from '../../models/error.model';
import { FamilyMemberModel } from '../../models/family.model';

const STUB_ID = 'STUB_ID'

export const resolvers = {
    Query: {
        family: async (): Promise<{
            id: string,
            members?: FamilyMemberModel[];
            errors?: [ErrorModel];
        }> => {
            try {
                const members = await readFileJSON('data/family.json');

                return {
                    id: STUB_ID,
                    members,
                };
            } catch (error) {
                return {
                    id: STUB_ID,
                    errors: [{ field: 'family', message: `Query family error ${error.message}` }],
                };
            }
        },
    },
    Mutation: {
        createFamilyMember: async (
            _: any,
            {
                name,
                age,
            }: {
                name: string;
                age: number;
            }
        ): Promise<{
            id: string,
            members?: FamilyMemberModel;
            errors?: [ErrorModel];
        }> => {
            const path = 'data/family.json';

            if (!name) {
                return {
                    id: STUB_ID,
                    errors: [{ field: 'addFamilyMember', message: `No name input provided` }],
                };
            }

            if (!age) {
                return {
                    id: STUB_ID,
                    errors: [{ field: 'addFamilyMember', message: `No age input provided` }],
                };
            }

            const member = { age, name, id: `Member_${Date.now()}` };

            try {
                let members = await readFileJSON(path);

                if (!Array.isArray(members)) {
                    members = [];
                }

                members.push(member);

                await writeFileJSON(path, members);

                return {
                    id: STUB_ID,
                    members,
                };
            } catch (error) {
                return {
                    id: STUB_ID,
                    errors: [{ field: 'addFamilyMember', message: `Mutation addFamilyMember error ${error.message}` }],
                };
            }
        },
        updateFamilyMember: async (
            _: any,
            {
                input,
            }: {
                input: FamilyMemberModel;
            }
        ): Promise<{
            id: string,
            members?: FamilyMemberModel[];
            errors?: [ErrorModel];
        }> => {
            const path = 'data/family.json';

            try {
                let members = await readFileJSON(path);

                if (!Array.isArray(members)) {
                    return {
                        id: STUB_ID,
                        errors: [
                            {
                                field: 'updateFamilyMember',
                                message: `Mutation updateFamilyMember error no members to update`,
                            },
                        ],
                    };
                }

                let isMember = members.find((m: FamilyMemberModel) => m.id === input.id);

                if (!isMember) {
                    return {
                        id: STUB_ID,
                        errors: [
                            {
                                field: 'updateFamilyMember',
                                message: `Mutation updateFamilyMember error no such member`,
                            },
                        ],
                    };
                }

                members = members.map((m: FamilyMemberModel) => (m.id === input.id ? input : m));

                await writeFileJSON(path, members);

                return {
                    id: STUB_ID,
                    members,
                };
            } catch (error) {
                return {
                    id: STUB_ID,
                    errors: [
                        { field: 'updateFamilyMember', message: `Mutation updateFamilyMember error ${error.message}` },
                    ],
                };
            }
        },
        deleteFamilyMember: async (
            _: any,
            {
                id,
            }: {
                id: string;
            }
        ): Promise<{
            id: string,
            members?: FamilyMemberModel[];
            errors?: [ErrorModel];
        }> => {
            const path = 'data/family.json';

            try {
                let members = await readFileJSON(path);

                members = members.filter((member: FamilyMemberModel) => member.id !== id);

                await writeFileJSON(path, members);

                return {
                    id: STUB_ID,
                    members,
                };
            } catch (error) {
                return {
                    id: STUB_ID,
                    errors: [
                        { field: 'deleteFamilyMember', message: `Mutation deleteFamilyMember error ${error.message}` },
                    ],
                };
            }
        },
    },
};
