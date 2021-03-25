import React, { memo } from 'react';
import { View } from 'react-native';
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
        <View>
            {data.family?.members?.map(member => {
                if (member) {
                    return (
                        <FamilyMember key={member?.id} onUpdate={onUpdate} onRemove={onRemove} member={member} />
                    );
                }

                return null;
            })}
        </View>
    );
});

export default Family;
