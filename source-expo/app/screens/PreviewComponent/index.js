import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { EPostListData } from '@/data';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import {
  BookingTime,
  Button,
  Card,
  CardChannel,
  CardChannelGrid,
  CardCommentSignal,
  CardList,
  CardReport01,
  CardReport02,
  CardReport03,
  CardReport04,
  CardReport05,
  CardReport06,
  CardReport07,
  CardReport08,
  CardReport09,
  CardReport10,
  CardSlide,
  CategoryBlock,
  CategoryBoxColor,
  CategoryBoxColor2,
  CategoryFull,
  CategoryGrid,
  CategoryIcon,
  CategoryIconSoft,
  CategoryList,
  CommentItem,
  FilterBar,
  FilterSort,
  Header,
  Icon,
  Image,
  LabelUpper2Row,
  LineChart,
  ListThumbCircle,
  ListThumbSquare,
  ListTransaction,
  ListTransactionExpand,
  News169,
  News43,
  NewsGrid,
  NewsList,
  NewsWishlist,
  PieChart,
  PlaceItem,
  Price2Col,
  Price3Col,
  ProductBlock,
  ProfileAuthor,
  ProfileDescription,
  ProfileDetail,
  ProfileGroup,
  ProfilePerformance,
  RateDetail,
  SafeAreaView,
  SearchBox,
  StackedBarChart,
  StarRating,
  StatisticText3Col,
  TabSlider,
  Tag,
  Text,
  TextInput,
  Transaction2Col,
} from '@/components';
import styles from './styles';

const ScreenDemo = () => {
  return <View />;
};

const PreviewComponent = (props) => {
  const { navigation, isShowHeader = true } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [filter, setFilter] = useState({
    leftValue: false,
    centerValue: false,
    rightValue: true,
  });
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'apps', title: 'Apps' },
    { key: 'screens', title: 'Screens' },
    { key: 'components', title: 'Components' },
  ]);
  const renderScene = SceneMap({
    apps: ScreenDemo,
    screens: ScreenDemo,
    components: ScreenDemo,
  });
  const dataLineChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [200, 500, 1000, 500, 1000, 250, 2000, 1500, 1000, 50, 20, 10],
        color: (_opacity = 1) => colors.primaryLight,
        strokeWidth: 2, // optional
      },
      {
        data: [300, 1500, 500, 500, 100, 200, 400, 500, 1000, 1000, 100, 100],
        color: (_opacity = 1) => BaseColor.accentColor, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [t('income'), t('expense')],
  };

  const dataStackedBarChart = {
    labels: ['January', 'Febuary'],
    legend: [t('income'), t('expense')],
    data: [
      [500, 300],
      [300, 200],
    ],
    barColors: [BaseColor.pinkLightColor, BaseColor.accentColor],
  };

  const dataPieChart = [
    {
      name: 'Ultilitites',
      population: 70,
      color: colors.primaryLight,
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Entertainment',
      population: 20,
      color: colors.accent,
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Food and Drink',
      population: 10,
      color: BaseColor.kashmir,
      legendFontColor: '#7F7F7F',
    },
  ];

  const renderComponent = () => {
    return (
      <View>
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text body1 style={[styles.title, { marginTop: 0 }]}>
              Text
            </Text>
            <Text header>Header</Text>
            <Text title1>Title1</Text>
            <Text title2>Title2</Text>
            <Text title3>Title3</Text>
            <Text headline>Headline</Text>
            <Text body1>Body1</Text>
            <Text body2>Body2</Text>
            <Text callout>Callout</Text>
            <Text subhead>Subhead</Text>
            <Text footnote>footnote</Text>
            <Text caption1>caption1</Text>
            <Text caption2>caption2</Text>
            <Text overline>overline</Text>
            <Text body1 style={styles.title}>
              Button
            </Text>
            <Button style={{ marginVertical: 4 }}>Button Normal</Button>
            <Button loading style={{ marginVertical: 4 }}>
              Button Loading
            </Button>
            <Button style={{ marginVertical: 4 }} outline>
              Button Outline
            </Button>

            <Button
              style={{ marginVertical: 4 }}
              round
              icon={<Icon style={{ marginHorizontal: 5 }} name="plus" color="white" size={16} />}
            >
              Button Icon
            </Button>
            <Text body1 style={styles.title}>
              LineChart
            </Text>
            <LineChart data={dataLineChart} />
            <Text body1 style={styles.title}>
              StackedBarChart
            </Text>
            <StackedBarChart data={dataStackedBarChart} />
            <Text body1 style={styles.title}>
              PieChart
            </Text>
            <PieChart data={dataPieChart} />
            <Text body1 style={styles.title}>
              TabSlider
            </Text>
            <TabSlider navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
            <Text body1 style={styles.title}>
              TextInput
            </Text>
            <TextInput />
            <Text body1 style={styles.title}>
              Card
            </Text>
            <Card
              style={{ width: '100%', height: 100 }}
              // image={Images.profile1}
              styleContent={{
                position: 'absolute',
                bottom: 0,
                padding: 10,
              }}
              onPress={() => {}}
            >
              <Text footnote whiteColor>
                {'Mr.NavaTa'}
              </Text>
              <Text headline whiteColor semibold>
                {'Nguyen Van Thai'}
              </Text>
            </Card>
            <Text body1 style={styles.title}>
              Card Channel
            </Text>
            <CardChannel
              onPress={() => {}}
              onPressTag={() => {}}
              item={{
                image: Images.channel1,
                title: 'CNN',
              }}
            />
            <Text body1 style={styles.title}>
              Card Channel Grid
            </Text>
            <CardChannelGrid
              onPress={() => {}}
              onPressTag={() => {}}
              item={{
                image: Images.channel1,
                title: 'CNN',
              }}
            />
            <Text body1 style={styles.title}>
              Card List
            </Text>
            <CardList
              style={{}}
              image={Images.channel1}
              title="News"
              subtitle="Description news"
              rate={4.5}
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              Card Slide
            </Text>
            <CardSlide style={{}} image={Images.channel1} title="News" date="28-04-2020" onPress={() => {}} />
            <Text body1 style={styles.title}>
              Category Block
            </Text>
            <CategoryBlock
              style={{}}
              image={Images.location1}
              title="News"
              subtitle="Subtitle News"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              Category Box Color
            </Text>
            <CategoryBoxColor style={{}} title="News" icon="book" color="#FF8A65" onPress={() => {}} />
            <Text body1 style={styles.title}>
              CategoryBoxColor2
            </Text>
            <CategoryBoxColor2
              style={{}}
              title="News"
              subtitle="Subtitle News"
              icon="book"
              color="#FF8A65"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              Category Full
            </Text>
            <CategoryFull
              style={{}}
              image={Images.location1}
              title="News"
              subtitle="Subtitle News"
              icon="book"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              Category Grid
            </Text>
            <CategoryGrid style={{}} image={Images.location1} title="News" onPress={() => {}} />
            <Text body1 style={styles.title}>
              Category Icon
            </Text>
            <CategoryIcon
              style={{}}
              icon="book"
              title="News"
              subtitle="Subtitle News"
              color={colors.primary}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              Category List
            </Text>
            <CategoryList style={{}} title="News" subtitle="Subtitle News" image={Images.channel1} onPress={() => {}} />
            <Text body1 style={styles.title}>
              CategoryIconSoft
            </Text>
            <CategoryIconSoft title="Wifi" icon="wifi" />
            <Text body1 style={styles.title}>
              Comment Item
            </Text>
            <CommentItem
              style={{}}
              image={Images.channel1}
              name="Jony"
              rate={4}
              date={'27-04-2020'}
              title="News"
              comment={'Very helpful'}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              Filter Sort
            </Text>
            <FilterSort style={{ height: 50 }} modeView={'square'} labelCustom={''} />
            <Text body1 style={styles.title}>
              Header
            </Text>
            <Header
              title="Preview Component"
              renderLeft={() => {
                return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
              }}
              renderRight={() => {
                return <Icon name="search" size={20} color={colors.primary} />;
              }}
            />
            <Text body1 style={styles.title}>
              Image
            </Text>
            <Image source={Images.channel1} resizeMode={'contain'} style={{ width: 100, height: 100 }} />
            <Text body1 style={styles.title}>
              List Thumb Circle
            </Text>
            <ListThumbCircle
              image={Images.channel1}
              txtLeftTitle="Corona"
              txtContent="Corona is virus ..."
              txtRight="27-04-2020"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              List Thumb Square
            </Text>
            <ListThumbSquare
              image={Images.channel1}
              txtLeftTitle="Corona"
              txtContent="Corona is virus ..."
              txtRight="27-04-2020"
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              News43
            </Text>
            <News43
              style={{}}
              name={'Steve Garrett'}
              description={'5 hours ago | 100k views'}
              title={'What is coronavirus and how worried should we be?'}
              image={Images.newsMain}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              News169
            </Text>
            <News169
              style={{}}
              image={Images.news}
              avatar={Images.profile}
              name={'Steve Garrett'}
              description={'5 hours ago | 100k views'}
              title={'What is coronavirus and how worried should we be?'}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              NewsGrid
            </Text>
            <NewsGrid
              style={{}}
              image={Images.news}
              title={'What is coronavirus and how worried should we be?'}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              NewsList
            </Text>
            <NewsList
              style={{}}
              image={Images.news}
              title={'What is coronavirus and how worried should we be?'}
              subtitle={'New and troubling viruses usually originate in animal hosts.'}
              onPress={() => {}}
              date={'07-05-2020'}
            />
            <Text body1 style={styles.title}>
              NewsWishlist
            </Text>
            <NewsWishlist
              style={{}}
              image={Images.news}
              title={'What is coronavirus and how worried should we be?'}
              subtitle={'New and troubling viruses usually originate in animal hosts.'}
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              PlaceItem
            </Text>
            <PlaceItem
              style={{}}
              image={Images.channel1}
              list={false}
              block={false}
              grid={true}
              title={'What is coronavirus ?'}
              subtitle={'New and troubling viruses usually originate ...'}
              location={'Ho Chi Minh'}
              phone={'0912345678'}
              rate={4.5}
              status={'Active'}
              rateStatus={'Total rate'}
              numReviews={99}
              onPress={() => {}}
              onPressTag={() => {}}
            />
            <Text body1 style={styles.title}>
              ProfileAuthor
            </Text>
            <ProfileAuthor
              style={{}}
              image={Images.profile1}
              name="Mr.Jolly"
              description="jolly@gmail.com"
              textRight="22-02-1992"
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              ProfileDescription
            </Text>
            <ProfileDescription
              image={Images.profile1}
              name="Cristiano Ronaldo"
              subName="CR7"
              description="cr7@gmail.com"
              textRight="22-02-1992"
              styleThumb={{}}
              style={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              ProfileDetail
            </Text>
            <ProfileDetail
              image={Images.profile1}
              textFirst="Cristiano Ronaldo"
              textSecond="CR7"
              icon={true}
              point="9.0"
              style={{}}
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              onPress={() => {}}
            />
            <Text body1 style={styles.title}>
              ProfileGroup
            </Text>
            <ProfileGroup
              users={[
                {
                  image: Images.profile1,
                },
                {
                  image: Images.profile1,
                },
                {
                  image: Images.profile1,
                },
              ]}
              name="Members"
              detail="The first 20 members include ex-Guardian editor Alan "
              style={{}}
              styleLeft={{}}
              styleThumb={{}}
              styleRight={{}}
              onPress={() => {}}
              onPressLove={() => {}}
            />
            <Text body1 style={styles.title}>
              ProfilePerformance
            </Text>
            <ProfilePerformance
              flexDirection="row"
              type="medium"
              data={[
                {
                  title: 'Normal',
                  value: 1,
                },
                {
                  title: 'Good',
                  value: 8,
                },
                {
                  title: 'Very good',
                  value: 10,
                },
              ]}
              style={{}}
              contentLeft={{}}
              contentCenter={{}}
              contentRight={{}}
            />
            <Text body1 style={styles.title}>
              RateDetail
            </Text>
            <RateDetail style={{}} point={4.5} maxPoint={5} totalRating={4.5} onPress={() => {}} />
            <Text body1 style={styles.title}>
              SearchBox
            </Text>
            <SearchBox onSubmitEditing={() => {}} loading={false} />
            <Text body1 style={styles.title}>
              StarRating
            </Text>
            <StarRating
              containerStyle={{ width: '50%' }}
              disabled={true}
              starSize={26}
              maxStars={5}
              rating={4.5}
              selectedStar={() => {}}
              fullStarColor={BaseColor.yellowColor}
            />
            <Text body1 style={styles.title}>
              Tag
            </Text>
            <Tag onPress={() => {}} rateSmall style={{ marginVertical: 4 }}>
              4.5
            </Tag>
            <Tag chip style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>

            <Tag primary style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag outline style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag outlineSecondary style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag small style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>
            <Tag sale style={{ marginVertical: 4 }} onPress={() => {}}>
              4.5
            </Tag>

            <Text body1 style={styles.title}>
              CardReport10
            </Text>
            <CardReport10 icon={'home'} name="Paypal" percent={65.5} price="-$129" />
            <Text body1 style={styles.title}>
              CardReport09
            </Text>
            <CardReport09
              icon={'chart-line'}
              title="How To Spend Investment Money"
              description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
              textReadMore="Read More"
            />
            <Text body1 style={styles.title}>
              CardReport08
            </Text>
            <CardReport08
              percent={50}
              title="Current Goal"
              subTitle="Accumulate $29,000"
              description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
            />
            <Text body1 style={styles.title}>
              CardReport07
            </Text>
            <CardReport07 icon="book" title="BTC" subTitle="Total Earnings" price="$1000" percent="+8,99%" />
            <Text body1 style={styles.title}>
              CardReport06
            </Text>
            <CardReport06 icon="arrow-up" title="BTC" price="$1000" percent="+8,99%" />
            <Text body1 style={styles.title}>
              CardReport05
            </Text>
            <CardReport05 icon="arrow-up" title="Balance" price="$1000" />
            <Text body1 style={styles.title}>
              CardReport04
            </Text>
            <CardReport04
              icon="chart-bar"
              title="Balance"
              price="$1000"
              subTitle1="Subtitle1"
              percent1="100%"
              subTitle2="Subtitle2"
              percent2="80%"
            />
            <Text body1 style={styles.title}>
              CardReport03
            </Text>
            <CardReport03 icon="heart" title="Balance" price="$1000" subTitle="Subtitle" percent="8,99%" />
            <Text body1 style={styles.title}>
              CardReport02
            </Text>
            <CardReport02 icon="chart-bar" title="Balance" price="$1000" />
            <Text body1 style={styles.title}>
              CardReport01
            </Text>
            <CardReport01 icon="book" title="Income" price="$1000" />
            <Text body1 style={styles.title}>
              CardCommentSignal
            </Text>
            <CardCommentSignal
              image={Images.news}
              imageThumbnail={Images.news}
              title="Bitcon News"
              subTitle="Json Thomas, Breaking News"
              tagName="Teachnical"
              comment="Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt."
              commentUrl="https://fintechmagazine.com/venture-capital/us-israeli-fintech-sunbit-raises-dollar130m-hits-unicorn-status"
              titleThumbnail="US-Israeli fintech Sunbit raises $130m, hits unicorn status"
              subTitleThumbnail="https://fintechmagaz"
              titleShare="Share"
            />

            <Text body1 style={styles.title}>
              FilterBar
            </Text>
            <FilterBar
              leftTitle="Coin"
              centerTitle="Price"
              rightTitle="Cap/Vol"
              value={filter}
              onChange={(value) => setFilter(value)}
            />
            <Text body1 style={styles.title}>
              LabelUpper2Row
            </Text>
            <LabelUpper2Row label="Test" value="$1200" />
            <Text body1 style={styles.title}>
              Price3Col
            </Text>
            <Price3Col
              image={Images.news}
              code="BTC"
              name="Bitcoin"
              costPrice="$11,390"
              marketCap="0,29B"
              percent="8,99%"
              price="$12,000"
            />
            <Text body1 style={styles.title}>
              Price2Col
            </Text>
            <Price2Col
              image={Images.news}
              code="BTC"
              name="Bitcoin"
              costPrice="$11,390"
              marketCap="0,29B"
              percent="8,99%"
              price="$12,000"
            />
            <Text body1 style={styles.title}>
              Transaction2Col
            </Text>
            <Transaction2Col icon="apple" name="Paypal" date="2021 Jan 01" status="Transfer" price="-$129" />
            <Text body1 style={styles.title}>
              StatisticText3Col
            </Text>
            <StatisticText3Col
              topLeft="MARKET CAP"
              centerLeft="9.69T"
              bottomLeft="-10,99%"
              topCenter="MARKET CAP"
              centerCenter="100.5T"
              bottomCenter="-9,99%"
              topRight="MARKET CAP"
              centerRight="43.99%"
              bottomRight="-10,99%"
            />
            <Text body1 style={styles.title}>
              ListTransaction
            </Text>
            <ListTransaction
              icon={'exchange-alt'}
              name="Paypal"
              date="Jun 06, 2021 05:00 pm"
              status="Paid 3900USD"
              price="-$129"
            />
            <Text body1 style={styles.title}>
              ListTransactionExpand
            </Text>
            <ListTransactionExpand
              ListTransactionProps={{
                icon: 'exchange-alt',
                name: 'Paypal',
                date: 'Jun 06, 2021 05:00 pm',
                status: 'Paid 3900USD',
                price: '-$129',
                disabled: true,
              }}
              tradingPairTitle="TradingPair"
              tradingPairValue="BTC/USD"
              priceTitle="Price"
              price="$39,000"
              feeTitle="fee"
              feeValue="$0"
              costTitle="Cost (Fee included)"
              costValue="$0"
              changeTitle="Change"
              changeValue="-"
              currentTitle="Current Value"
              currentValue="$0"
            />
            <Text body1 style={styles.title}>
              BookingTime
            </Text>
            <BookingTime checkInTime="09:00" checkOutTime="18:00" onCancel={() => {}} onChange={() => {}} />
            <Text body1 style={styles.title}>
              ProductBlock
            </Text>
            <ProductBlock
              description={EPostListData[0].description}
              title={EPostListData[0].title}
              style={{ marginVertical: 8 }}
              image={EPostListData[0].image}
              costPrice={EPostListData[0].costPrice}
              salePrice={EPostListData[0].salePrice}
              onPress={() => {}}
              isFavorite={EPostListData[0].isFavorite}
              salePercent={EPostListData[0].salePercent}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  if (!isShowHeader) {
    return renderComponent();
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('preview_component')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
      />
      {renderComponent()}
    </SafeAreaView>
  );
};

export default PreviewComponent;
