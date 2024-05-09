import React, { Component } from 'react';
import Container from '@/components/Container';
import Card from '@/components/Card';
import RN from '@/components/RN';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container isScroll={true}>
        <RN.View fd={'row'} g={15} jc={'space-between'}>
          <Card isPremium={true} />
          <Card />
        </RN.View>
        <RN.View fd={'row'} g={15} jc={'space-between'}>
          <Card isPremium={true} />
          <Card />
        </RN.View>
        <RN.View fd={'row'} g={15} jc={'space-between'}>
          <Card isPremium={true} />
          <Card />
        </RN.View>
      </Container>
    );
  }
}
