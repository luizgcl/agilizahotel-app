import { MapPinLine } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Constants } from '../../../Constants';
import { GeneralInput } from '../../components/GeneralInput';
import { PasswordInput } from '../../components/PasswordInput';
import { styles } from './style';
import { firebase } from "../../../firebase-connection";

export function Login({ navigation }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  useEffect(() => {
    if (user) {
      navigation.navigate('Home')
    }
  }, [user]);

  const handleClickForgetPassword = () => {
    navigation.navigate('ForgetPassword')
  }

  const handleClickLogin = () => {
    if (!email || !password) {
      alert('Preencha os campos corretamente!')
      return;
    }
    
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user.uid) {
          setUser(user)
          navigation.navigate('Home')
        }
      })
      .catch((error) => {
        if (error)
          alert('Credenciais inválidas!');
      });
  }

  return (
    <SafeAreaView style={styles.container}>

      <MapPinLine
        size={80}
        color={Constants.colors.purple}
      />

      <View
        style={styles.textLogo}
      >
        <Text style={styles.textLogoPartOne}>Agiliza</Text>
        <Text style={styles.textLogoPartTwo}>Hotel</Text>
      </View>

      <View>
        <Text>Usuário</Text>
        <GeneralInput
          placeholder="E-mail ou nome de usuário"
          onChangeText={(email) => setEmail(email)}
        />

        <Text>Senha</Text>
        <PasswordInput 
          updatePassword={(password) => setPassword(password)}
        />

        <View
          style={{
            ...styles.textLogo,
            marginTop: 6,
            alignItems: 'center'
          }}
        >
          <Text style={styles.font}>Esqueceu a senha? </Text>
          <TouchableOpacity
            onPress={handleClickForgetPassword}
          >
            <Text
              style={{
                ...styles.font,
                color: '#85c'
              }}
            >
              Clique aqui
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={handleClickLogin}
      >
        <Text style={styles.accessText}>Acessar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}