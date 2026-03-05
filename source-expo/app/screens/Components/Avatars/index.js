import { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { PProject } from '@/data';
import { BaseStyle, useTheme } from '@/config';
import RangeSlider from '@/screens/Components/Common/RangeSlider';
import styles from '@/screens/Components/Common/styles';
import { Avatars, Header, Icon, SafeAreaView, Text } from '@/components';

const ImageReview = ({ navigation }) => {
  const { colors } = useTheme();
  const [showMore, setShowMore] = useState(false);
  const [limit, setLimit] = useState(3);
  const [size, setSize] = useState(45);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={'Avatars Component'}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text footnote bold>
            Demo
          </Text>
          <View style={[styles.item, { alignContent: 'center', alignItems: 'center' }]}>
            <Avatars
              users={PProject[0].members}
              isShowMore={showMore}
              limit={limit}
              styleThumb={{
                width: size,
                height: size,
              }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider label="Size" min={30} max={60} low={size} onValueChanged={(value) => setSize(value)} />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <RangeSlider
                label="Limit"
                min={1}
                max={PProject[0].members.length}
                low={limit}
                onValueChanged={(value) => setLimit(value)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text footnote bold>
              ShowMore
            </Text>
            <Switch onValueChange={() => setShowMore((value) => !value)} value={showMore} />
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text footnote bold>
              Example
            </Text>
            <View style={styles.row}>
              <Avatars users={PProject[0].members} />
            </View>
            <View style={styles.row}>
              <Avatars users={PProject[0].members} isShowMore={true} limit={3} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageReview;
