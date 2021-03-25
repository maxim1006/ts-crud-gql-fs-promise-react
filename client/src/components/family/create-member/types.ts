export type CreateFamilyMemberProps = {
    onCreate: (member: { name: string; age: number }) => void;
};