import React, {useState, useRef} from 'react';
import { StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, TextBase} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import {useStore} from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import {FlatList} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import FoodCard from '../components/FoodCard';

const getCategoriesFromData = (data: any) => {
    let temp:any = {};

    for (let i=0; i < data.length; i++) {
        if(temp[data[i].type] == undefined) {
            temp[data[i].type] =1;
        } else {
            temp[data[i].type]++;
        }
    }
    let categories = Object.keys(temp);
    categories.unshift("All");
    return categories;
}

const getFoodList = (category: string, data:any) => {
    if(category == "All") {
        return data;
    } else {
        let foodList = data.filter((item:any) => item.type == category) 
        return foodList;
    }
};

const HomeScreen = ({navigation}: any) => {

    const BurgerList = useStore((state: any) => state.BurgerList);
    const PizzaList = useStore((state: any) => state.PizzaList);
    const ZapiekankiList = useStore((state: any) => state.ZapiekankiList);
    const StekiList = useStore((state: any) => state.StekiList);
    const KebabyList = useStore((state: any) => state.KebabyList);
    const KidsList = useStore((state: any) => state.KidsList);
    const SalatkiList = useStore((state: any) => state.SalatkiList);
    const NapojeList = useStore((state: any) => state.NapojeList);
    const MustTasteList = useStore((state: any) => state.MustTasteList);
    const DodatkiList = useStore((state: any) => state.DodatkiList);
    const SosyList = useStore((state: any) => state.SosyList);
    const FoodList = useStore((state: any) => state.FoodList);
    

    const [categories, setCategories] = useState(
        getCategoriesFromData(FoodList),
    );
    const [searchText, setSearchText] = useState('');

    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedFood, setSortedFood] = useState(
        getFoodList(categoryIndex.category, FoodList)
    );

    

    const tabBarHeight = useBottomTabBarHeight();

    console.log("NazwaPizzy= ", categoryIndex);

    return(
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={'black'}/>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.ScrollViewFlex}> 
                <HeaderBar/>

                <Text style={styles.TextFind}> Find the best {'\n'} food for you</Text>
            
                <View style={styles.InputContainerComponent}>
                    <TouchableOpacity onPress={() => {}}>
                        <Icons 
                            style={styles.InputIcon}
                            name="search1" 
                            size={FONTSIZE.size_18} 
                            color={
                                searchText.length > 0 
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryLightGreyHex
                            }
                        /> 
                    </TouchableOpacity>
                    <TextInput 
                        placeholder="FInd Your Food..." 
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.TextInputContainer}
                    />
                </View>
            
                <ScrollView
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 contentContainerStyle={styles.CategoryScrollViewStyle}>
                    {categories.map((data, index) =>  (
                        <View 
                         key={index.toString()} 
                         style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => {
                                setCategoryIndex({index: index, category: categories[index]});
                                setSortedFood([
                                 ...getFoodList(categories[index], FoodList)
                                ]);
                            }}>
                                <Text style={[styles.CategoryText, categoryIndex.index == index 
                                    ? { color: COLORS.primaryOrangeHex}
                                    : {},
                                ]}> {data}</Text>
                                {categoryIndex.index == index 
                                  ? (<View style={styles.ActiveCategory} />)
                                  : ( <></> )
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <Text style={styles.FoodTitle}>{BurgerList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={BurgerList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                        return <TouchableOpacity onPress={() => {}}>
                            <FoodCard
                                id={item.id}
                                index={item.index}
                                type={item.type}
                                stage={item.stage}
                                imagelink_square={item.imagelink_square}
                                name={item.name}
                                average_rating={item.average_rating}
                                price={item.price}
                                buttonPressHandler={() => {}}
                            />
                        </TouchableOpacity>
                        } else {
                            return null;
                        }
                    }}
                />
                

                <Text style={styles.FoodTitle}>{PizzaList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={PizzaList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{ZapiekankiList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={ZapiekankiList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />
                
                <Text style={styles.FoodTitle}>{StekiList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={StekiList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{KebabyList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={KebabyList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{KidsList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={KidsList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{SalatkiList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={SalatkiList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{NapojeList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={NapojeList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{MustTasteList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={MustTasteList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{DodatkiList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={DodatkiList}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                <Text style={styles.FoodTitle}>{SosyList[0].type}</Text>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={SosyList}
                    contentContainerStyle={[styles.FlatListContainer, {marginBottom: tabBarHeight}]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        if (categoryIndex.category === "All" || categoryIndex.category === item.type) {
                            return <TouchableOpacity onPress={() => {}}>
                                <FoodCard
                                    id={item.id}
                                    index={item.index}
                                    type={item.type}
                                    stage={item.stage}
                                    imagelink_square={item.imagelink_square}
                                    name={item.name}
                                    average_rating={item.average_rating}
                                    price={item.price}
                                    buttonPressHandler={() => {}}
                                />
                            </TouchableOpacity>
                            } else {
                                return null;
                            }
                    }}
                />

                
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex:1,
        backgroundColor: 'black',
    },
    ScrollViewFlex:{
        flexGrow: 1,
    },
    TextFind: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        paddingLeft: SPACING.space_30,
    },
    InputContainerComponent: {
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor:COLORS.primaryDarkGreyHex,
        flexDirection: 'row',
        alignItems: 'center',
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
        flex: 1,
        height:SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    CategoryScrollViewStyle:{
        paddingHorizontal:SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem:{
        alignItems: 'center',
    },
    CategoryText:{
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {
        gap: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
        paddingVertical: SPACING.space_20,
    },
    FoodTitle:{
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
});

export default HomeScreen;


