import React from 'react';
import { Image, Text, View } from 'react-native';
import { CardBack } from '../../components/animated/CardBack';
import PagerView from 'react-native-pager-view';

export default function WinningCardScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#88a',
      }}
    >
      <PagerView
        initialPage={0}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='1'
        >
          <CardBack backgroundColor='black' borderColor='#661122'>
            <Image
              source={require('@/assets/images/card-back/back04.jpg')}
              style={{ alignSelf: 'center', flex: 1, marginVertical: -50 }}
              resizeMode='contain'
              resizeMethod='auto'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='2'
        >
          <CardBack backgroundColor='black' borderColor='#958855'>
            <Image
              source={require('@/assets/images/card-back/back03.jpg')}
              style={{ alignSelf: 'center', flex: 1, marginVertical: -10 }}
              resizeMode='contain'
              resizeMethod='auto'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='3'
        >
          <CardBack backgroundColor='black' borderColor='#000'>
            <Image
              source={require('@/assets/images/card-back/back02.jpg')}
              style={{ alignSelf: 'center', flex: 1, marginVertical: -10 }}
              resizeMode='contain'
              resizeMethod='auto'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='4'
        >
          <CardBack
            backgroundColor='black'
            borderColor='#ddd'
            // style={{ marginBottom: 0 }}
            key={4}
          >
            <Image
              source={require('@/assets/images/card-back/back01.jpg')}
              style={{ alignSelf: 'center', flex: 1, marginVertical: -10 }}
              resizeMode='contain'
              resizeMethod='auto'
            />
          </CardBack>
        </View>
      </PagerView>
    </View>
  );
}
