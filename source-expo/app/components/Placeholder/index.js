import * as RNPlaceholder from 'rn-placeholder';
import { useTheme } from '@/config';
import Progressive from './Progressive';

export const PlaceholderLine = ({ style, ...attrs }) => {
  const { colors } = useTheme();
  return <RNPlaceholder.PlaceholderLine {...attrs} style={[style, { backgroundColor: colors.card }]} />;
};

export const Placeholder = ({ ...attrs }) => {
  return <RNPlaceholder.Placeholder {...attrs} Animation={(props) => <Progressive {...props} duration={1500} />} />;
};
