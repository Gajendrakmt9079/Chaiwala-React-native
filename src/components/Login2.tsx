import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import auth0 from '../../auth0';
 // Import the Auth0 instance

interface UserInfo {
  idTokenPayload: {
    name: string;
    email?: string;
  };
}

const LoginScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      setUserInfo(credentials as UserInfo);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View>
      <Button title="Login with Auth0" onPress={handleLogin} />
      {userInfo && <Text>Welcome {userInfo.idTokenPayload.name}</Text>}
    </View>
  );
};

export default LoginScreen;
