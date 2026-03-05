import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, TouchableOpacity, View, FlatList } from 'react-native';
import Draggable from 'react-native-draggable';
import Modal from 'react-native-modal';
import * as Utils from '@/utils';
import { MaziListApp } from '@/config/maziHome';
import { BaseColor, useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import CategoryIconSoft from '@/components/Category/IconSoft';
import Button from '@/components/Button';
import styles from './styles';

const window = Dimensions.get('window');
let boundsData = { left: window.width - 70, top: window.height - 150 };

const AssistiveTouch = ({ goToApp = () => {} }) => {
  const { colors } = useTheme();
  const [expand, setExpand] = useState(false);
  const { t } = useTranslation();
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription?.remove();
    };
  });

  const onChange = (dimensions) => {
    const { width, height } = dimensions.window;
    boundsData = { left: window.width - 70, top: window.height - 150 };
    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
  };

  const onExpand = () => {
    Utils.enableExperimental();
    setExpand(true);
  };

  return (
    <Fragment>
      {!expand && (
        <Draggable
          key={orientation}
          x={boundsData.left}
          y={boundsData.top}
          minX={10}
          minY={20}
          onDragRelease={(event) =>
            (boundsData = {
              left: event.nativeEvent.pageX,
              top: event.nativeEvent.pageY,
            })
          }
        >
          <Button
            style={{
              padding: 0,
              borderRadius: 50,
              paddingHorizontal: 0,
              height: 60,
              width: 60,
              backgroundColor: 'rgba(0,0,0,0.6)',
              opacity: 0.7,
            }}
            round
            icon={<Icon name="dot-circle" size={35} color={BaseColor.fieldColor} />}
            children=""
            onPress={() => onExpand()}
          />
        </Draggable>
      )}

      <Modal
        isVisible={expand}
        onSwipeComplete={() => {
          setExpand(false);
        }}
        style={{ margin: 0 }}
        swipeDirection={['down']}
      >
        <View style={[styles.contentFilterBottom, { backgroundColor: colors.card }]}>
          <View style={styles.contentSwipeDown}>
            <View style={styles.lineSwipeDown} />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text headline style={{ flex: 1 }}>
                Mazi
              </Text>
              <TouchableOpacity
                hitSlop={{ top: 10, right: 10, left: 10 }}
                style={{
                  width: 30,
                  alignItems: 'flex-end',
                }}
                onPress={() => setExpand(false)}
              >
                <Icon name="times" size={14} />
              </TouchableOpacity>
            </View>
            <Text footnote grayColor>
              React Native UI KITS
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={MaziListApp}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              if (item.id === 'Common') {
                return null;
              }
              return (
                <View
                  style={{
                    flex: 1 / 4,
                    marginTop: 20,
                  }}
                >
                  <CategoryIconSoft
                    style={{ backgroundColor: 'transparent' }}
                    iconContentStyle={{ backgroundColor: item.backgroundColor }}
                    isRound
                    isWhite
                    icon={item.icon}
                    title={t(item.title)}
                    maxWidth={80}
                    onPress={() => {
                      goToApp(item.id);
                      setExpand(false);
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </Modal>
    </Fragment>
  );
};

export default AssistiveTouch;
