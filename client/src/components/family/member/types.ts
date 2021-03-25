import { GetFamily_family_members } from "../__generated__/GetFamily";

export type FamilyMemberProps = {
    member: GetFamily_family_members;
    onRemove?: (member: GetFamily_family_members) => void;
    onUpdate?: (member: GetFamily_family_members) => void;
};