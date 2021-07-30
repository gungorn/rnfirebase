import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { KEYBOARD_OPEN, KEYBOARD_CLOSE, USER_LOGIN, USER_SIGNIN } from '~redux'; //user actions

import { stylesForLogin, stylesForSignIn } from './styles';
import { COLOR } from '~/utils/theme';
import { T } from '~/components';
import { keyboardListener } from '~/utils/keyboard';

//redux state to props
const mapStateToProps = ({ user }) => ({ user });

//redux dispatch to props
const mapDispatchToProps = dispatch => ({
    USER_LOGIN: () => dispatch(USER_LOGIN()), //action
    USER_SIGNIN: (eposta, parola) => dispatch(USER_SIGNIN(eposta, parola)), //action
    KEYBOARD_OPEN: h => dispatch(KEYBOARD_OPEN(h)), //action
    KEYBOARD_CLOSE: () => dispatch(KEYBOARD_CLOSE()), //action
});

//redux connect func
const conectWithRedux = connect(mapStateToProps, mapDispatchToProps);

//component
const Splash = conectWithRedux(props => {

    useEffect(() => { //componentDidMount
        keyboardListener(props.KEYBOARD_OPEN, props.KEYBOARD_CLOSE);
    }, []);

    //states
    const [isSignIn, setIsSignIn] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    //user store
    const { user } = props;

    const submit = () => isSignIn ? props.USER_SIGNIN(eposta, parola) : props.USER_LOGIN();

    const styles = isSignIn ? stylesForSignIn : stylesForLogin;

    return (
        <View style={styles.main}>
            <T style={styles.appName} font={'b'} size={'xxxxxl'}>My Note</T>

            <View style={styles.inputsContainer}>
                {isSignIn &&
                    <TextInput
                        style={styles.nameInput}
                        placeholder={'İsminiz'}
                        value={name}
                        onChangeText={setName}
                        maxLength={64}
                    />
                }

                <TextInput
                    style={styles.emailInput}
                    placeholder={'E-Posta'}
                    value={email}
                    onChangeText={setEmail}
                    maxLength={64}
                />

                <TextInput
                    style={styles.passwordInput}
                    placeholder={'Parola'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    maxLength={16}
                />

                {isSignIn &&
                    <TextInput
                        style={styles.passwordInput2}
                        placeholder={'Tekrar'}
                        value={password2}
                        onChangeText={setPassword2}
                        secureTextEntry
                        maxLength={16}
                    />
                }
            </View>

            <TouchableOpacity onPress={submit} style={styles.submitButton}>
                <T style={styles.submitButtonText} font={'b'} size={'l'}>{isSignIn ? 'Üye Ol' : 'Giriş Yap'}</T>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)} style={styles.signInButton}>
                {isSignIn && <AntDesign name={'left'} size={16} color={COLOR('lightGray')} />}
                <T style={styles.signInButtonText}>{isSignIn ? 'Zaten Üyeyim' : 'Üye Ol'}</T>
            </TouchableOpacity>
        </View>
    );
});

export { Splash };