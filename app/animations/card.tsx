import React from 'react';
import { Image, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Card } from '../../components/animated/CardBack';

export default function WinningCardScreen() {
  const SCALE = 0.3;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#add',
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
          key='0'
        >
          <Card
            backgroundColor='#000'
            backBorderColor='#444'
            frontBorderColor='#fff'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back00.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  backfaceVisibility: 'visible',
                }}
              >
                <Image
                  source={require('@/assets/images/card-front/front00.jpg')}
                  style={{ alignSelf: 'center', flex: 1 }}
                  resizeMode='contain'
                />
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    justifyContent: 'space-between',
                    top: 5,
                    bottom: 5,
                    right: 10,
                    left: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#000',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A<Text style={{ fontSize: 60 * SCALE }}>♧</Text>
                  </Text>

                  <Text
                    style={{ fontSize: 150 * SCALE, textAlign: 'center' }}
                  />
                  <View
                    style={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: 90 * SCALE,
                        transform: [{ rotateX: '180deg' }],
                        zIndex: 3000,
                        backfaceVisibility: 'visible',
                      }}
                    >
                      <Text style={{ fontSize: 60 * SCALE }}>♧</Text>A
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          key='1'
        >
          <Card
            backgroundColor='#fbd84d'
            backBorderColor='#fbd84d'
            frontBorderColor='#fbd84d'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back05.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  backfaceVisibility: 'visible',
                }}
              >
                {/* <Image
                  source={require('@/assets/images/card-front/front00.jpg')}
                  style={{ alignSelf: 'center', flex: 1 }}
                  resizeMode='contain'
                /> */}
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    justifyContent: 'space-between',
                    top: 5,
                    bottom: 5,
                    right: 10,
                    left: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>

                  <Text style={{ fontSize: 150 * SCALE, textAlign: 'center' }}>
                    ❤️
                  </Text>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'right',
                        color: '#D22',
                        fontSize: 90 * SCALE,
                        transform: [{ rotateX: '180deg' }],
                        zIndex: 3000,
                        backfaceVisibility: 'visible',
                      }}
                    >
                      A
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='2'
        >
          <Card
            backgroundColor='#1a1a1a'
            backBorderColor='#958855'
            frontBorderColor='#202020'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back03.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  paddingVertical: 10 * SCALE,
                  paddingHorizontal: 20 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text style={{ fontSize: 200 * SCALE, textAlign: 'center' }}>
                  ❤️
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'right',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='3'
        >
          <Card
            backgroundColor='black'
            backBorderColor='#000'
            frontBorderColor='#000'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back02.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 10 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text style={{ fontSize: 200 * SCALE, textAlign: 'center' }}>
                  ❤️
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'right',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='4'
        >
          <Card
            backgroundColor='#ddd'
            backBorderColor='#ddd'
            frontBorderColor='#ddd'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back01.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 10 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text style={{ fontSize: 200 * SCALE, textAlign: 'center' }}>
                  💎
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'right',
                      color: '#D22',
                      fontSize: 90 * SCALE,
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='6'
        >
          <Card
            backgroundColor='#f2483e'
            backBorderColor='#f2483e'
            frontBorderColor='#f2483e'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back07.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 10 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 200 * SCALE,
                    textAlign: 'center',
                    color: '#fff',
                  }}
                >
                  🤍
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                      textAlign: 'right',
                      fontSize: 90 * SCALE,
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='7'
        >
          <Card
            backgroundColor='#095761'
            backBorderColor='#095761'
            frontBorderColor='#095761'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back06.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 10 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFF',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text style={{ fontSize: 200 * SCALE, textAlign: 'center' }}>
                  🤍
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFF',
                      fontSize: 90 * SCALE,
                      textAlign: 'right',
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='5'
        >
          <Card
            backgroundColor='#9a01c3'
            backBorderColor='#000'
            frontBorderColor='#9a01c3'
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back08.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  padding: 10 * SCALE,
                  backfaceVisibility: 'visible',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFF',
                      fontSize: 90 * SCALE,
                    }}
                  >
                    A
                  </Text>
                </View>
                <Text style={{ fontSize: 200 * SCALE, textAlign: 'center' }}>
                  🤍
                </Text>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFF',
                      fontSize: 90 * SCALE,
                      textAlign: 'right',
                      transform: [{ rotateX: '180deg' }],
                      zIndex: 3000,
                      backfaceVisibility: 'visible',
                    }}
                  >
                    A
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key='10'
        >
          <Card
            backgroundColor='#000'
            borderless
            scale={SCALE}
            back={
              <Image
                source={require('@/assets/images/card-back/back10.jpg')}
                style={{ alignSelf: 'center', flex: 1 }}
                resizeMode='contain'
              />
            }
            front={
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  justifyContent: 'space-between',
                  backfaceVisibility: 'visible',
                }}
              >
                <Image
                  source={require('@/assets/images/card-front/front10.jpg')}
                  style={{ alignSelf: 'center', flex: 1 }}
                  resizeMode='contain'
                />
                <View
                  style={{
                    flex: 1,
                    position: 'absolute',
                    marginTop: 35,
                    marginBottom: 35,
                    marginRight: 35,
                    marginLeft: 35,
                    justifyContent: 'space-between',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    borderWidth: 2,
                    borderColor: '#FFF',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#FFF',
                      fontSize: 90 * SCALE,
                      marginTop: -30,
                      marginLeft: -25,
                    }}
                  >
                    A
                  </Text>

                  <Text style={{ fontSize: 150 * SCALE, textAlign: 'center' }}>
                    🤍
                  </Text>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      marginBottom: -30,
                      marginRight: -25,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#FFF',
                        textAlign: 'right',
                        fontSize: 90 * SCALE,
                        transform: [{ rotateX: '180deg' }],
                        zIndex: 3000,
                        backfaceVisibility: 'visible',
                      }}
                    >
                      A
                    </Text>
                  </View>
                </View>
              </View>
            }
          />
        </View>
      </PagerView>
    </View>
  );
}
