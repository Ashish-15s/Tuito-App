import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterBar = ({ filter, setFilter }) => {
    const togglePaid = () =>
        setFilter(prev => ({ ...prev, showPaid: !prev.showPaid }));

    const toggleUnpaid = () =>
        setFilter(prev => ({ ...prev, showUnpaid: !prev.showUnpaid }));

    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6 }}>Filter:</Text>

            <View style={{ flexDirection: 'row', gap: 16 }}>
                <TouchableOpacity onPress={toggleUnpaid} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={filter.showUnpaid ? 'checkbox' : 'square-outline'}
                        size={20}
                        color="#007AFF"
                    />
                    <Text style={{ marginLeft: 8 }}>Unpaid</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePaid} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name={filter.showPaid ? 'checkbox' : 'square-outline'}
                        size={20}
                        color="#007AFF"
                    />
                    <Text style={{ marginLeft: 8 }}>Paid</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FilterBar;
