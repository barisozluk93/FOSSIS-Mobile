import { useCallback } from 'react';
import Slider from 'rn-range-slider';
import PropTypes from 'prop-types';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Notch from './Notch';
import Label from './Label';
import styles from './styles';

export default function RangeSlider(props) {
  const {
    color = '#7f7f7f',
    selectionColor = '#4499ff',
    style = {},
    min = 0,
    max = 100,
    low,
    high,
    onValueChanged,
    ...attrs
  } = props;
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail color={color} />, []);
  const renderRailSelected = useCallback(() => <RailSelected color={selectionColor} />, []);
  const renderLabel = useCallback((value) => <Label text={value} color={selectionColor} />, []);
  const renderNotch = useCallback(() => <Notch color={selectionColor} />, []);

  return (
    <Slider
      style={[styles.slider, style]}
      min={min}
      max={max}
      low={low}
      high={high}
      step={1}
      disableRange={false}
      floatingLabel={true}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      renderNotch={renderNotch}
      onValueChanged={onValueChanged}
      {...attrs}
    />
  );
}

RangeSlider.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  color: PropTypes.string,
  selectionColor: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onValueChanged: PropTypes.func,
};
