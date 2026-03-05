import { useEffect, useState } from 'react';
import { Platform, View, Alert } from 'react-native';
import { Actions, Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat';
import { useTranslation } from 'react-i18next';
import { BaseStyle, useTheme, Images } from '@/config';
import { Header, Icon, SafeAreaView, Text } from '@/components';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import styles from './styles';
import messagesInit from './data/messages';
import messagesOldInit from './data/old_messages';

let _isMounted = true;
let _isAlright = false;

const NMessages = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [messages, setMessages] = useState(messagesInit);
  const [loadEarlier, setLoadEarlier] = useState(true);
  const [typingText, setTypingText] = useState(null);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);

  useEffect(() => {
    _isMounted = true;
    return () => {
      _isMounted = true;
    };
  }, []);

  const onLoadEarlier = () => {
    setIsLoadingEarlier(true);

    setTimeout(() => {
      if (_isMounted === true) {
        setMessages(GiftedChat.prepend(messages, messagesOldInit));
        setLoadEarlier(false);
        setIsLoadingEarlier(false);
      }
    }, 500); // simulating network
  };

  const onSend = (messagesNew = []) => {
    setMessages(GiftedChat.append(messages, messagesNew));
    answerDemo(messagesNew);
  };

  const answerDemo = (messagesInline) => {
    if (messagesInline.length > 0) {
      if (messagesInline[0].image || messagesInline[0].location || !_isAlright) {
        setTypingText('React Native is typing');
      }
    }

    setTimeout(() => {
      if (_isMounted === true) {
        if (messagesInline.length > 0) {
          if (messagesInline[0].image) {
            onReceive('Nice picture!');
          } else if (messagesInline[0].location) {
            onReceive('My favorite place');
          } else {
            if (!_isAlright) {
              _isAlright = true;
              onReceive('Alright');
            }
          }
        }
      }

      setTypingText(null);
    }, 500);
  };

  const onReceive = (text) => {
    const messagesNew = GiftedChat.append(messages, {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: Images.profile2,
      },
    });
    setMessages(messagesNew);
  };

  const renderCustomActions = (props) => {
    if (Platform.OS === 'ios') {
      return <CustomActions {...props} />;
    }
    const options = {
      'Action 1': () => {
        Alert.alert('option 1');
      },
      'Action 2': () => {
        Alert.alert('option 2');
      },
      Cancel: () => {},
    };
    return <Actions {...props} options={options} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    return <CustomView {...props} />;
  };

  const renderFooter = () => {
    if (typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{typingText}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('reviews')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('replay')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      <GiftedChat
        messages={messages}
        isAnimated={true}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        loadEarlier={loadEarlier}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        user={{
          _id: 1, // sent messages should have same user._id
        }}
        renderActions={renderCustomActions}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderCustomView={renderCustomView}
        renderFooter={renderFooter}
      />
    </SafeAreaView>
  );
};

export default NMessages;
