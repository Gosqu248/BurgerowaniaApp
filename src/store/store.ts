import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BurgerData from '../data/BurgerData';
import PizzaData from '../data/PizzaData';
import DodatkiData from '../data/DodatkiData';
import KidsData from '../data/KidsData';
import ZapiekankiData from '../data/ZapiekankiData';
import StekiData from '../data/StekiData';
import SosyData from '../data/SosyData';
import SalatkiData from '../data/SalatkiData';
import NapojeData from '../data/NapojeData';
import KebabData from '../data/KebabData';
import MustTasteData from '../data/MustTasteData';

export const useStore = create(
  persist(
    (set, get) => ({
      BurgerList: BurgerData,
      PizzaList: PizzaData,
      ZapiekankiList: ZapiekankiData,
      StekiList: StekiData,
      KebabyList: KebabData,
      KidsList: KidsData,
      SalatkiList: SalatkiData,
      NapojeList: NapojeData,
      MustTasteList: MustTasteData,
      DodatkiList: DodatkiData,
      SosyList: SosyData,

      

      FoodList: Object.values({
        BurgerData,
        PizzaData,
        ZapiekankiData,
        StekiData,
        KebabData,
        KidsData,
        SalatkiData,
        NapojeData,
        MustTasteData,
        DodatkiData,
        SosyData,
      }).flat(),

      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],


          addToCart: (cartItem: any) =>
      set(
        produce(state => {
          let found = false;
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == cartItem.id) {
              found = true;
              state.CartList[i].quantity++;
              break;
            }
          }
          if (!found) {
            state.CartList.push({ ...cartItem, quantity: 1 });
          }
        })
      ),

      calculateCartPrice: () =>
      set(
        produce(state => {
          let totalPrice = 0;
          for (let i = 0; i < state.CartList.length; i++) {
            let itemPrice = parseFloat(state.CartList[i].price) * state.CartList[i].quantity;
            state.CartList[i].ItemPrice = itemPrice.toFixed(2).toString();
            totalPrice += itemPrice;
          }
          state.CartPrice = totalPrice.toFixed(2).toString();
        })
      ),

      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            let list;
                  switch (type) {
                    case 'Burgery':
                      list = state.BurgerList;
                      break;
                    case 'Pizza 30cm':
                      list = state.PizzaList;
                      break;
                    case 'Zapiekanki':
                      list = state.ZapiekankiList;
                      break;
                    case 'Steki':
                      list = state.StekiList;
                      break;
                    case 'Kebaby':
                      list = state.KebabyList;
                      break;
                    case 'Kids':
                      list = state.KidsList;
                      break;
                    case 'Sałatki':
                      list = state.SalatkiList;
                      break;
                    case 'Napoje':
                      list = state.NapojeList;
                      break;
                    case 'Tego musisz spróbować':
                      list = state.MustTasteList;
                      break;
                    case 'Dodatki':
                      list = state.DodatkiList;
                      break;
                    case 'Sosy':
                      list = state.SosyList;
                      break;
                    default:
                      return;
                  }

              for (let i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  if (list[i].favourite == false) {
                    list[i].favourite = true;
                    state.FavoritesList.unshift(list[i]);
                  } else {
                    list[i].favourite = false;
                  }
                  break;
                }
              }
            
          }),
        ),

      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {

            let list;
                  switch (type) {
                    case 'Burgery':
                      list = state.BurgerList;
                      break;
                    case 'Pizza 30cm':
                      list = state.PizzaList;
                      break;
                    case 'Zapiekanki':
                      list = state.ZapiekankiList;
                      break;
                    case 'Steki':
                      list = state.StekiList;
                      break;
                    case 'Kebaby':
                      list = state.KebabyList;
                      break;
                    case 'Kids':
                      list = state.KidsList;
                      break;
                    case 'Sałatki':
                      list = state.SalatkiList;
                      break;
                    case 'Napoje':
                      list = state.NapojeList;
                      break;
                    case 'Tego musisz spróbować':
                      list = state.MustTasteList;
                      break;
                    case 'Dodatki':
                      list = state.DodatkiList;
                      break;
                    case 'Sosy':
                      list = state.SosyList;
                      break;
                    default:
                      return;
                  }
            
              for (let i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  if (list[i].favourite == true) {
                    list[i].favourite = false;
                  } else {
                    list[i].favourite = true;
                  }
                  break;
                }
              }
            
            let spliceIndex = -1;
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id == id) {
                spliceIndex = i;
                break;
              }
            }
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),

      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id) {
                    state.CartList[i].quantity++;
                    break;
                  }
                }
          }),
        ),
        decrementCartItemQuantity: (id: string, size: string) =>
        set(
            produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        if (state.CartList[i].quantity > 1) {
                            state.CartList[i].quantity--;
                        } else {
                            state.CartList.splice(i, 1); 
                        }
                    }
                }
            }),
        ),
    
      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentValue: any) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );
            if (state.OrderHistoryList.length > 0) {
              state.OrderHistoryList.unshift({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            } else {
              state.OrderHistoryList.push({
                OrderDate:
                  new Date().toDateString() +
                  ' ' +
                  new Date().toLocaleTimeString(),
                CartList: state.CartList,
                CartListPrice: temp.toFixed(2).toString(),
              });
            }
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);