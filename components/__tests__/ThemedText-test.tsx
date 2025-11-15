import * as React from 'react';
import { render } from '@testing-library/react-native';

import { ThemedText } from '../ThemedText';

describe('<ThemedText />', () => {
  test('CustomText renders correctly', () => {
    const tree = render(<ThemedText>Some text</ThemedText>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<ThemedText>Welcome!</ThemedText>);

    const text = getByText('Welcome!');
    expect(text).toBeTruthy();
  });
});
