import React, { memo } from 'react';
import { ErrorComponent } from '../common/error.component';
import { LoaderComponent } from '../common/loader.component';
import { NotFoundComponent } from '../common/not-found.component';
import FamilyMember from './member/family-member.component';
import { FamilyProps } from './types';

const Family = memo<FamilyProps>(({ data, loading, error, onRemove, onUpdate }) => {

    if (loading) return <LoaderComponent/>;
    if (error) return <ErrorComponent />;
    if (!data) return <NotFoundComponent />;

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
