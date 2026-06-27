import { Beat, Room, StudioSection, MerchItem } from '../data/types';

export type RootStackParamList = {
  Tabs: undefined;
  RoomDetail: { room: Room };
  BeatDetail: { beat: Beat };
  SectionDetail: { section: StudioSection };
  MerchDetail: { item: MerchItem };
  Events: undefined;
  Cart: undefined;
  Checkout: undefined;
  Contact: undefined;
};

export type TabParamList = {
  Home: undefined;
  Book: undefined;
  Beats: undefined;
  Shop: undefined;
  More: undefined;
};
