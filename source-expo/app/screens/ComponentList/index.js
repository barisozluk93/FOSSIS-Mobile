import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, BaseColor } from '@/config';
import { Icon, Text } from '@/components';
import styles from './styles';

const Item = ({ onPress, title, description, ComponentRight = null, iconName, iconBackground, isBorder = true }) => {
  const { colors } = useTheme();
  const styleItem = [
    styles.profileItem,
    {
      borderBottomColor: colors.border,
    },
  ];
  return (
    <TouchableOpacity style={styleItem} onPress={onPress} disabled={!onPress}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 5,
          backgroundColor: iconBackground,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}
      >
        <Icon size={20} name={iconName} color={BaseColor.whiteColor} />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderBottomWidth: isBorder ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: colors.border,
            paddingVertical: 15,
            justifyContent: 'center',
            height: 60,
            paddingRight: 15,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text body2 bold>
            {title}
          </Text>
          {description && (
            <Text caption2 grayColor>
              {description}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>{ComponentRight}</View>
          {onPress && (
            <Icon name="angle-right" size={18} color={BaseColor.grayColor} style={{ marginLeft: 5 }} enableRTL={true} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ComponentList() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const data = [
    {
      iconName: 'italic',
      iconBackground: BaseColor.pinkLightColor,
      title: 'Text',
      description: 'A React component for displaying text.',
      screen: 'TextReview',
    },
    {
      iconName: 'compress',
      iconBackground: BaseColor.greenColor,
      title: 'Button',
      description: 'Buttons are touchable elements used to interact with the screen.',
      screen: 'ButtonReview',
    },
    {
      iconName: 'tag',
      iconBackground: BaseColor.accentColor,
      title: 'Tag',
      description: 'Tag for categorizing or markup.',
      screen: 'TagReview',
    },
    {
      iconName: 'icons',
      iconBackground: BaseColor.pinkColor,
      title: 'Icon',
      description:
        'Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project.',
      screen: 'IconReview',
    },
    {
      iconName: 'image',
      iconBackground: BaseColor.pinkDarkColor,
      title: 'Image',
      description: 'When you need to display pictures.',
      screen: 'ImageReview',
    },
    {
      iconName: 'check-square',
      iconBackground: BaseColor.kashmir,
      title: 'CheckBox',
      description: 'Used for selecting multiple values from several options..',
      screen: 'CheckBoxReview',
    },
    {
      iconName: 'star-half-alt',
      iconBackground: BaseColor.yellowColor,
      title: 'StarRating',
      description: "Ratings provide insight regarding others' opinions and experiences.",
      screen: 'StarRatingReview',
    },
    {
      iconName: 'user-circle',
      iconBackground: BaseColor.navyBlue,
      title: 'Avatars',
      description: 'Avatars can be used to represent people or objects.',
      screen: 'AvatarsReview',
    },
  ];

  const dataCard = [
    {
      iconName: 'address-card',
      iconBackground: BaseColor.pinkLightColor,
      title: 'Card',
      screen: 'CardReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.greenColor,
      title: 'CardList',
      screen: 'CardListReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.accentColor,
      title: 'CardSlide',
      screen: 'CardSlideReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.pinkColor,
      title: 'CardChannel',
      screen: 'CardChannelReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.pinkDarkColor,
      title: 'CardChannelGrid',
      screen: 'CardChannelGridReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.kashmir,
      title: 'CardBooking',
      screen: 'CardBookingReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.yellowColor,
      title: 'CardCommentPhoto',
      screen: 'CardCommentPhotoReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.orangeColor,
      title: 'CardCommentSignal',
      screen: 'CardCommentSignalReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.blueColor,
      title: 'CardFileAttachment',
      screen: 'CardFileAttachmentReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.pinkColor,
      title: 'CardCommentSimple',
      screen: 'CardCommentSimpleReview',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport01',
      screen: 'CardReport01Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport02',
      screen: 'CardReport02Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport03',
      screen: 'CardReport03Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport04',
      screen: 'CardReport04Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport05',
      screen: 'CardReport05Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport06',
      screen: 'CardReport06Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport07',
      screen: 'CardReport07Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport08',
      screen: 'CardReport08Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport09',
      screen: 'CardReport09Review',
    },
    {
      iconName: 'address-card',
      iconBackground: BaseColor.navyBlue,
      title: 'CardReport10',
      screen: 'CardReport10Review',
    },
  ];

  const renderContent = () => {
    return (
      <View style={{ backgroundColor: colors.card, flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.contain]}>
          <Text
            style={{
              textTransform: 'uppercase',
              paddingLeft: 10,
              paddingBottom: 5,
            }}
            grayColor
          >
            {'Common'}
          </Text>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 8,
            }}
          >
            {data.map((item, index) => (
              <Item
                key={String(index)}
                isBorder={index !== data.length - 1}
                title={item.title}
                description={item.description}
                iconName={item.iconName}
                iconBackground={item.iconBackground}
                onPress={() => navigation.navigate(item.screen)}
              />
            ))}
          </View>
          <Text
            style={{
              textTransform: 'uppercase',
              paddingLeft: 10,
              paddingBottom: 5,
              marginTop: 25,
            }}
            grayColor
          >
            {'Card'}
          </Text>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 8,
            }}
          >
            {dataCard.map((item, index) => (
              <Item
                key={String(index)}
                isBorder={index !== data.length - 1}
                title={item.title}
                description={item.description}
                iconName={item.iconName}
                iconBackground={item.iconBackground}
                onPress={() => navigation.navigate(item.screen)}
              />
            ))}
          </View>
          <Text
            style={{
              textTransform: 'uppercase',
              paddingLeft: 10,
              paddingBottom: 5,
              marginTop: 25,
            }}
            grayColor
          >
            {'And more'}
          </Text>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 8,
              padding: 15,
            }}
          >
            <Text caption2 grayColor>
              With the component is so many, we will continue to update ...
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  };

  return renderContent();
}
