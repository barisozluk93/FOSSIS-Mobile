import { useState } from 'react';
import { View, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseStyle, Images, useTheme, BaseColor } from '@/config';
import { SafeAreaView, Icon, Image, Text, TextInput, ProfileAuthor } from '@/components';
import styles from './styles';

export default function NMessages({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hello! I am  Steave Garrett, I would like to buy your product',
      created: 'Sun 2020 July 25 09:00',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: Images.profile1,
      },
    },
    {
      id: 2,
      message: 'Yes, Please tell me what do you want? Then I can help',
      created: 'Sun 2020 July 25 09:50',
    },
    {
      id: 3,
      message: 'I would like to buy the T-shirt with good price, The price should be $39.00',
      created: 'Sun 2020 July 25 09:55',
      user: {
        id: 1,
        name: 'Steve Garrett',
        avatar: Images.profile1,
      },
    },
    {
      id: 3,
      message: 'OK, I can accept this price, please tell me your phone !',
      created: 'Sun 2020 July 25 09:59',
    },
  ]);

  const renderItem = (item) => {
    if (item.user) {
      return (
        <View style={styles.userContent}>
          <Image source={Images.profile1} style={[styles.avatar]} borderColor={colors.border} />
          <View style={{ paddingHorizontal: 8, flex: 1, paddingRight: 40 }}>
            <View style={[styles.userContentMessage, { backgroundColor: colors.card }]}>
              <Text body2>{item.message}</Text>
            </View>
            <View style={styles.userContentDate}>
              <Text overline grayColor numberOfLines={1}>
                {item.created}
              </Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.meContent}>
        <View style={{ flex: 1, paddingLeft: 80 }}>
          <View style={[styles.meContentMessage, { backgroundColor: colors.primaryLight }]}>
            <Text body2 whiteColor>
              {item.message}
            </Text>
          </View>
          <View style={styles.meContentDate}>
            <Text overline grayColor numberOfLines={1}>
              {item.created}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (input !== '') {
      messages.push({
        id: Math.random().toString(),
        message: input,
        created: '08:45 AM',
      });
      setInput('');
      setMessages(messages);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{ paddingLeft: 20, paddingRight: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon solid name="angle-left" size={20} color={colors.text} enableRTL={true} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ProfileAuthor
            style={{}}
            image={Images.profile1}
            name="Mr.Jolly"
            description="jolly@gmail.com"
            textRight=""
            styleLeft={{}}
            styleThumb={{}}
            styleRight={{}}
            onPress={() => {}}
          />
        </View>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <Icon solid name="microphone" size={18} color={colors.text} enableRTL={true} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
          <Icon solid name="video" size={18} color={colors.text} enableRTL={true} />
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingLeft: 10, paddingRight: 20 }}>
          <Icon solid name="ellipsis-v" size={16} color={colors.text} enableRTL={true} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'flex-end' }}
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        enabled
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderItem(item)}
        />
        <View style={styles.inputContent}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ borderRadius: 40, paddingHorizontal: 20 }}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={() => sendMessage()}
              placeholder={t('typing_your_message')}
              value={input}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                height: '100%',
                right: 0,
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 14,
              }}
            >
              <Icon solid name="paperclip" size={20} color={BaseColor.grayColor} enableRTL={true} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.sendIcon, { backgroundColor: colors.primary }]} onPress={sendMessage}>
            <Icon solid name="paper-plane" size={20} color={BaseColor.whiteColor} enableRTL={true} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
