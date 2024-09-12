import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}
            keyboardVerticalOffset={-100}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


export default KeyboardAvoidingWrapper;