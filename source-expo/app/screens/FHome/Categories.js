import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { FCategories } from '@/data';
import { CategoryIconSoft } from '@/components';

const Categories = ({ style = {} }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const goToScreen = (name) => name && navigation.navigate(name);

  return (
    <View style={[{ flexDirection: 'row', marginVertical: 20 }, style]}>
      {FCategories.map((item) => (
        <View
          key={item.id}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CategoryIconSoft isRound icon={item.icon} title={t(item.title)} onPress={() => goToScreen(item.screen)} />
        </View>
      ))}
    </View>
  );
};

export default Categories;
