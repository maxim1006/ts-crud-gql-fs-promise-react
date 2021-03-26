import { GetFamily, GetFamily_family_members } from "./__generated__/GetFamily";
import { ApolloError } from '@apollo/client/errors';

export type FamilyProps = {
    data: GetFamily;
    loading: boolean;
    error?: ApolloError;
    onRemove?: (member: GetFamily_family_members) => void;
    onUpdate?: (member: GetFamily_family_members) => void;
};