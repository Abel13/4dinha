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
          <CardBack backgroundColor='black' borderColor='#fbd84d'>
            <Image
              source={require('@/assets/images/card-back/back05.jpg')}
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
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
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
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
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
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
          <CardBack backgroundColor='black' borderColor='#ddd' key={4}>
            <Image
              source={require('@/assets/images/card-back/back01.jpg')}
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='5'
        >
          <CardBack backgroundColor='black' borderColor='#f2483e' key={4}>
            <Image
              source={require('@/assets/images/card-back/back07.jpg')}
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='6'
        >
          <CardBack backgroundColor='black' borderColor='#095761' key={4}>
            <Image
              source={require('@/assets/images/card-back/back06.jpg')}
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
            />
          </CardBack>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='6'
        >
          <CardBack backgroundColor='black' borderColor='#9a01c3' key={4}>
            <Image
              source={require('@/assets/images/card-back/back08.jpg')}
              style={{ alignSelf: 'center', flex: 1 }}
              resizeMode='contain'
            />
          </CardBack>
        </View>
      </PagerView>
    </View>
  );
}
