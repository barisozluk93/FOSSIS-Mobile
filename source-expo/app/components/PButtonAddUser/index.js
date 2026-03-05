import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import styles from './styles';

const PButtonAddUser = ({ onPress = () => {} }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, { borderColor: colors.primary }]} onPress={onPress}>
      <Icon name="plus-circle" size={14} solid color={colors.primary} />
    </TouchableOpacity>
  );
};

export default PButtonAddUser;
