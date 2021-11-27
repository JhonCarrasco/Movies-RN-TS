import React from 'react'
import { ActivityIndicator, View } from 'react-native'

interface SpinLoading {
    color: string
    size: number
}

const SpinLoading = ({
    color,
    size,
}: SpinLoading) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator
                color={color}
                size={size}
            />
        </View>
    )
}

export default SpinLoading
