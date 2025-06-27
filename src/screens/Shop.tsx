import React from 'react';
import {View, Text} from 'react-native';

import {svg} from '../assets/svg';
import {custom} from '../custom';
import {components} from '../components';
import {ShopScreenProps, hooks} from '../hooks';

const Shop: React.FC<ShopScreenProps> = ({route}) => {
  const {title, products} = route.params;
  const navigation = hooks.useNavigation();

  const renderStatusBar = () => {
    return <custom.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} title={title} />;
  };

  const renderFilterAndSort = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingBottom: 17,
        }}
      >
        <custom.TouchableOpacity
          onPress={() => {
            navigation.navigate('Filter');
          }}
        >
          <svg.FiltersSvg />
        </custom.TouchableOpacity>
        <custom.TouchableOpacity>
          <svg.SortingBySvg />
        </custom.TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (products?.length === 0) {
      return <Text>You don't have any products yet. Please, add some.</Text>;
    }

    if (products?.length > 0) {
      return (
        <custom.FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            flexGrow: 1,
            paddingBottom: 20,
          }}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item, index}) => {
            const lastItem = index === products.length - 1;
            return (
              <components.ShopItem
                key={index}
                item={item}
                lastItem={lastItem}
              />
            );
          }}
        />
      );
    }
  };

  const renderHomeIndicator = () => {
    return <custom.HomeIndicator />;
  };

  return (
    <custom.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderFilterAndSort()}
      {renderContent()}
      {renderHomeIndicator()}
    </custom.SmartView>
  );
};

export default Shop;
