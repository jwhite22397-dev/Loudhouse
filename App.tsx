import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { ComponentProps, useMemo, useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type IconName = ComponentProps<typeof Ionicons>['name'];
type TabKey = 'home' | 'rooms' | 'beats' | 'shop' | 'more';
type LicenseKey = 'basic' | 'premium' | 'exclusive';

type Tab = {
  key: TabKey;
  label: string;
  icon: IconName;
};

type Room = {
  name: string;
  specialty: string;
  capacity: string;
  mood: string;
  accent: string;
};

type Program = {
  title: string;
  eyebrow: string;
  description: string;
  icon: IconName;
  cta: string;
  url: string;
};

type Beat = {
  id: string;
  title: string;
  producer: string;
  bpm: number;
  key: string;
  mood: string;
  tags: string[];
  color: string;
  licensePrices: Record<LicenseKey, number>;
};

type CartItem = {
  beatId: string;
  license: LicenseKey;
};

const WEBSITE_URL = 'https://www.loudhousestudios.com';
const BOOKING_URL = 'https://pocketsuite.io/book/340loudhouse/items';
const EVENTS_URL = `${WEBSITE_URL}/events`;
const MERCH_URL = `${WEBSITE_URL}/category/all-products`;
const DATE_NIGHT_URL = `${WEBSITE_URL}/the-808-date`;
const CONTACT_EMAIL = 'info@loudhousestudios.com';
const CONTACT_PHONE = '404-938-8764';

const tabs: Tab[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'rooms', label: 'Rooms', icon: 'planet' },
  { key: 'beats', label: 'Beats', icon: 'musical-notes' },
  { key: 'shop', label: 'Shop', icon: 'bag-handle' },
  { key: 'more', label: 'More', icon: 'ellipsis-horizontal' },
];

const rooms: Room[] = [
  {
    name: 'Mercury',
    specialty: 'Production / Podcast Room',
    capacity: '2-4 guests',
    mood: 'Fast, focused, content-ready',
    accent: '#E3E3E3',
  },
  {
    name: 'Venus',
    specialty: 'Vocal tracking suite',
    capacity: '1-5 guests',
    mood: 'Warm vocals and intimate sessions',
    accent: '#F0A6CA',
  },
  {
    name: 'Saturn',
    specialty: 'Writing and mix room',
    capacity: '1-6 guests',
    mood: 'Detailed, spacious, locked in',
    accent: '#F6D365',
  },
  {
    name: 'Pluto',
    specialty: 'Creator room',
    capacity: '2-4 guests',
    mood: 'Compact room for quick ideas',
    accent: '#B8A4FF',
  },
  {
    name: 'Mars',
    specialty: 'Group recording suite',
    capacity: '2-10 guests',
    mood: 'High-energy crew sessions',
    accent: '#FF6B4A',
  },
  {
    name: 'Jupiter',
    specialty: 'Premium studio suite',
    capacity: '2-10 guests',
    mood: 'Big records and bigger rollouts',
    accent: '#7BDFF2',
  },
];

const programs: Program[] = [
  {
    title: 'Frequency Check',
    eyebrow: 'Monthly showcase',
    description:
      'A live artist showcase and competition for emerging Atlanta talent with prizes, content, and career-building opportunities.',
    icon: 'radio',
    cta: 'Enter showcase',
    url: EVENTS_URL,
  },
  {
    title: 'Song Submission',
    eyebrow: 'LoudHouse Music Group',
    description:
      'Submit records for production, distribution, marketing, and independent artist development support.',
    icon: 'cloud-upload',
    cta: 'Submit a song',
    url: `${WEBSITE_URL}/song-submission`,
  },
  {
    title: 'The 808 Date',
    eyebrow: 'Date night',
    description:
      'Create a song with your partner or crew inside a real studio with producer guidance and recap content.',
    icon: 'heart',
    cta: 'Book the experience',
    url: DATE_NIGHT_URL,
  },
  {
    title: 'Internship',
    eyebrow: 'Creative training',
    description:
      'Hands-on experience in music, production, content creation, and studio operations with real portfolio work.',
    icon: 'school',
    cta: 'Apply now',
    url: `${WEBSITE_URL}/internship`,
  },
];

const beats: Beat[] = [
  {
    id: 'midnight-rooms',
    title: 'Midnight Rooms',
    producer: 'LoudHouse Team',
    bpm: 142,
    key: 'F minor',
    mood: 'Dark melodic trap',
    tags: ['Trap', 'Pain', 'Atlanta'],
    color: '#9C6BFF',
    licensePrices: { basic: 29, premium: 79, exclusive: 499 },
  },
  {
    id: 'frequency-run',
    title: 'Frequency Run',
    producer: 'Mercury Lab',
    bpm: 156,
    key: 'C# minor',
    mood: 'Showcase-ready bounce',
    tags: ['Club', 'Energy', '808'],
    color: '#FFD166',
    licensePrices: { basic: 39, premium: 99, exclusive: 699 },
  },
  {
    id: 'peachtree-late',
    title: 'Peachtree Late',
    producer: 'Jupiter Suite',
    bpm: 96,
    key: 'A minor',
    mood: 'R&B night drive',
    tags: ['R&B', 'Smooth', 'Vocal'],
    color: '#7BDFF2',
    licensePrices: { basic: 35, premium: 89, exclusive: 599 },
  },
  {
    id: 'mars-session',
    title: 'Mars Session',
    producer: 'LoudHouse Team',
    bpm: 130,
    key: 'G minor',
    mood: 'Aggressive street anthem',
    tags: ['Drill', 'Trap', 'Hard'],
    color: '#FF6B4A',
    licensePrices: { basic: 29, premium: 79, exclusive: 549 },
  },
];

const licenseLabels: Record<LicenseKey, string> = {
  basic: 'Basic MP3',
  premium: 'Premium WAV',
  exclusive: 'Exclusive',
};

const licenseNotes: Record<LicenseKey, string> = {
  basic: 'Good for demos, social drops, and first releases.',
  premium: 'WAV delivery with higher stream allowance.',
  exclusive: 'Beat removed from catalog after purchase.',
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [activeBeatId, setActiveBeatId] = useState<string | null>(beats[0].id);
  const [selectedLicenses, setSelectedLicenses] = useState<Record<string, LicenseKey>>(
    Object.fromEntries(beats.map((beat) => [beat.id, 'premium'])) as Record<string, LicenseKey>,
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartTotal = useMemo(
    () =>
      cart.reduce((total, item) => {
        const beat = beats.find((candidate) => candidate.id === item.beatId);
        return beat ? total + beat.licensePrices[item.license] : total;
      }, 0),
    [cart],
  );

  const addToCart = (beat: Beat) => {
    const license = selectedLicenses[beat.id] ?? 'premium';
    setCart((current) => {
      const exists = current.some((item) => item.beatId === beat.id && item.license === license);
      if (exists) {
        return current;
      }
      return [...current, { beatId: beat.id, license }];
    });
  };

  const removeCartItem = (index: number) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const checkoutCart = () => {
    if (cart.length === 0) {
      Alert.alert('Your cart is empty', 'Add a beat license before checking out.');
      return;
    }

    const lines = cart.map((item) => {
      const beat = beats.find((candidate) => candidate.id === item.beatId);
      if (!beat) {
        return '';
      }
      return `${beat.title} - ${licenseLabels[item.license]} - ${formatCurrency(beat.licensePrices[item.license])}`;
    });
    const body = encodeURIComponent(
      `I want to buy these LoudHouse beat licenses:\n\n${lines.join('\n')}\n\nEstimated total: ${formatCurrency(
        cartTotal,
      )}`,
    );
    openUrl(`mailto:${CONTACT_EMAIL}?subject=LoudHouse%20Beat%20Order&body=${body}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'rooms':
        return <RoomsScreen />;
      case 'beats':
        return (
          <BeatsScreen
            activeBeatId={activeBeatId}
            cart={cart}
            cartTotal={cartTotal}
            onAddToCart={addToCart}
            onCheckout={checkoutCart}
            onRemoveCartItem={removeCartItem}
            onSelectBeat={setActiveBeatId}
            onSelectLicense={(beatId, license) =>
              setSelectedLicenses((current) => ({ ...current, [beatId]: license }))
            }
            selectedLicenses={selectedLicenses}
          />
        );
      case 'shop':
        return <ShopScreen />;
      case 'more':
        return <MoreScreen />;
      case 'home':
      default:
        return <HomeScreen onOpenBeats={() => setActiveTab('beats')} onOpenRooms={() => setActiveTab('rooms')} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.app}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.logo}>LOUDHOUSE</Text>
            <Text style={styles.logoSub}>Studios Atlanta</Text>
          </View>
          <Pressable style={styles.bookPill} onPress={() => openUrl(BOOKING_URL)}>
            <Ionicons color="#111" name="calendar" size={16} />
            <Text style={styles.bookPillText}>Book</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <Pressable key={tab.key} style={styles.tabItem} onPress={() => setActiveTab(tab.key)}>
                <Ionicons color={isActive ? '#FFD166' : '#8D8D8D'} name={tab.icon} size={21} />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ onOpenBeats, onOpenRooms }: { onOpenBeats: () => void; onOpenRooms: () => void }) {
  return (
    <View>
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.eyebrow}>Professional recording studio</Text>
        <Text style={styles.heroTitle}>Create, record, release, and get heard from Atlanta.</Text>
        <Text style={styles.heroBody}>
          A mobile home for LoudHouse Studios: book planetary rooms, join showcases, submit music, shop merch, and
          license beats from one place.
        </Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryButton} onPress={() => openUrl(BOOKING_URL)}>
            <Text style={styles.primaryButtonText}>Book a room</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onOpenBeats}>
            <Text style={styles.secondaryButtonText}>Browse beats</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat value="6" label="Rooms" />
        <Stat value="ATL" label="Studio hub" />
        <Stat value="24h" label="Cancel notice" />
      </View>

      <SectionHeader
        title="LoudHouse access"
        subtitle="The main website sections reworked as app-ready cards."
        action="View rooms"
        onAction={onOpenRooms}
      />
      <View style={styles.programGrid}>
        {programs.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}
      </View>

      <View style={styles.featureBanner}>
        <View style={styles.featureIcon}>
          <Ionicons color="#111" name="sparkles" size={24} />
        </View>
        <View style={styles.featureText}>
          <Text style={styles.featureTitle}>Limited spots available</Text>
          <Text style={styles.featureBody}>
            Push urgent specials, member-only studio bundles, and drop announcements directly in the app.
          </Text>
        </View>
      </View>
    </View>
  );
}

function RoomsScreen() {
  return (
    <View>
      <SectionHero
        icon="planet"
        label="Book a room"
        title="Choose your planet."
        body="Keep the website's Mercury, Venus, Saturn, Pluto, Mars, and Jupiter navigation, redesigned for quick mobile booking."
      />
      <View style={styles.roomGrid}>
        {rooms.map((room) => (
          <View key={room.name} style={styles.roomCard}>
            <View style={[styles.planet, { backgroundColor: room.accent }]} />
            <View style={styles.roomTopLine}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Ionicons color={room.accent} name="radio-button-on" size={18} />
            </View>
            <Text style={styles.roomSpecialty}>{room.specialty}</Text>
            <Text style={styles.roomMeta}>{room.capacity}</Text>
            <Text style={styles.roomMood}>{room.mood}</Text>
            <Pressable style={styles.smallButton} onPress={() => openUrl(BOOKING_URL)}>
              <Text style={styles.smallButtonText}>Request to book</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>The 808 Date packages</Text>
        <Text style={styles.infoBody}>
          $250 for 2 hours in Mercury or Pluto for 2-4 people. $350 for 2 hours in Mars or Jupiter for 2-10 people.
          Studio time, engineer, and producer guidance included.
        </Text>
        <Pressable style={styles.outlineButton} onPress={() => openUrl(DATE_NIGHT_URL)}>
          <Text style={styles.outlineButtonText}>Explore date night</Text>
        </Pressable>
      </View>
    </View>
  );
}

function BeatsScreen({
  activeBeatId,
  cart,
  cartTotal,
  onAddToCart,
  onCheckout,
  onRemoveCartItem,
  onSelectBeat,
  onSelectLicense,
  selectedLicenses,
}: {
  activeBeatId: string | null;
  cart: CartItem[];
  cartTotal: number;
  onAddToCart: (beat: Beat) => void;
  onCheckout: () => void;
  onRemoveCartItem: (index: number) => void;
  onSelectBeat: (beatId: string | null) => void;
  onSelectLicense: (beatId: string, license: LicenseKey) => void;
  selectedLicenses: Record<string, LicenseKey>;
}) {
  return (
    <View>
      <SectionHero
        icon="musical-notes"
        label="Beat marketplace"
        title="Sell beats like a modern artist store."
        body="Artists can preview beats, compare license tiers, build a cart, and send an order inquiry to LoudHouse."
      />

      <View style={styles.licenseExplainer}>
        {(Object.keys(licenseLabels) as LicenseKey[]).map((license) => (
          <View key={license} style={styles.licenseInfo}>
            <Text style={styles.licenseInfoTitle}>{licenseLabels[license]}</Text>
            <Text style={styles.licenseInfoBody}>{licenseNotes[license]}</Text>
          </View>
        ))}
      </View>

      {beats.map((beat) => (
        <BeatCard
          key={beat.id}
          beat={beat}
          isPlaying={activeBeatId === beat.id}
          onAddToCart={() => onAddToCart(beat)}
          onPressPreview={() => onSelectBeat(activeBeatId === beat.id ? null : beat.id)}
          onSelectLicense={(license) => onSelectLicense(beat.id, license)}
          selectedLicense={selectedLicenses[beat.id] ?? 'premium'}
        />
      ))}

      <View style={styles.cartCard}>
        <View style={styles.cartHeader}>
          <View>
            <Text style={styles.cartTitle}>Beat cart</Text>
            <Text style={styles.cartSubtitle}>{cart.length} license{cart.length === 1 ? '' : 's'} selected</Text>
          </View>
          <Text style={styles.cartTotal}>{formatCurrency(cartTotal)}</Text>
        </View>
        {cart.length === 0 ? (
          <Text style={styles.emptyCart}>Add beats to start an order.</Text>
        ) : (
          cart.map((item, index) => {
            const beat = beats.find((candidate) => candidate.id === item.beatId);
            if (!beat) {
              return null;
            }
            return (
              <View key={`${item.beatId}-${item.license}-${index}`} style={styles.cartLine}>
                <View>
                  <Text style={styles.cartLineTitle}>{beat.title}</Text>
                  <Text style={styles.cartLineMeta}>{licenseLabels[item.license]}</Text>
                </View>
                <View style={styles.cartLineRight}>
                  <Text style={styles.cartLinePrice}>{formatCurrency(beat.licensePrices[item.license])}</Text>
                  <Pressable onPress={() => onRemoveCartItem(index)}>
                    <Ionicons color="#BDBDBD" name="close-circle" size={22} />
                  </Pressable>
                </View>
              </View>
            );
          })
        )}
        <Pressable style={styles.primaryButtonFull} onPress={onCheckout}>
          <Text style={styles.primaryButtonText}>Start checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ShopScreen() {
  return (
    <View>
      <SectionHero
        icon="bag-handle"
        label="Shop / merch"
        title="Keep fans close after the session."
        body="Feature merch, ticketed events, specials, and future in-app drops for the LoudHouse community."
      />
      <View style={styles.productGrid}>
        <ProductCard title="LoudHouse T-Shirt" price="$19.99" label="Pre-order" icon="shirt" />
        <ProductCard title="LoudHouse Hoodie" price="$39.99" label="Pre-order" icon="shirt-outline" />
      </View>
      <View style={styles.actionList}>
        <ActionRow
          icon="ticket"
          title="Events"
          body="Open upcoming showcases, competitions, and studio events."
          onPress={() => openUrl(EVENTS_URL)}
        />
        <ActionRow
          icon="pricetag"
          title="Specials"
          body="Promote discounted sessions, rotating bundles, and member-only offers."
          onPress={() => openUrl(`${WEBSITE_URL}/specials`)}
        />
        <ActionRow
          icon="bag"
          title="Merch store"
          body="Send fans to the live LoudHouse merch catalog."
          onPress={() => openUrl(MERCH_URL)}
        />
      </View>
    </View>
  );
}

function MoreScreen() {
  return (
    <View>
      <SectionHero
        icon="rocket"
        label="Artist growth"
        title="Submit, join, and connect."
        body="Bring the website's artist-development paths into one mobile dashboard."
      />
      <View style={styles.actionList}>
        <ActionRow
          icon="cloud-upload"
          title="Song submissions"
          body="Submit music to LoudHouse Music Group for distribution and marketing consideration."
          onPress={() => openUrl(`${WEBSITE_URL}/song-submission`)}
        />
        <ActionRow
          icon="school"
          title="Internship program"
          body="Apply for hands-on experience in production, content, and studio operations."
          onPress={() => openUrl(`${WEBSITE_URL}/internship`)}
        />
        <ActionRow
          icon="people"
          title="Our clients"
          body="Showcase the artists, creators, and brands building inside LoudHouse."
          onPress={() => openUrl(`${WEBSITE_URL}/clients`)}
        />
      </View>
      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>Contact LoudHouse</Text>
        <Pressable style={styles.contactLine} onPress={() => openUrl(`tel:${CONTACT_PHONE}`)}>
          <Ionicons color="#FFD166" name="call" size={18} />
          <Text style={styles.contactText}>{CONTACT_PHONE}</Text>
        </Pressable>
        <Pressable style={styles.contactLine} onPress={() => openUrl(`mailto:${CONTACT_EMAIL}`)}>
          <Ionicons color="#FFD166" name="mail" size={18} />
          <Text style={styles.contactText}>{CONTACT_EMAIL}</Text>
        </Pressable>
        <View style={styles.contactLine}>
          <Ionicons color="#FFD166" name="location" size={18} />
          <Text style={styles.contactText}>West Peachtree Street NW, Atlanta, GA</Text>
        </View>
      </View>
    </View>
  );
}

function SectionHero({ body, icon, label, title }: { body: string; icon: IconName; label: string; title: string }) {
  return (
    <View style={styles.sectionHero}>
      <View style={styles.sectionIcon}>
        <Ionicons color="#111" name={icon} size={24} />
      </View>
      <Text style={styles.eyebrow}>{label}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

function SectionHeader({
  action,
  onAction,
  subtitle,
  title,
}: {
  action?: string;
  onAction?: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderText}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
        <Text style={styles.sectionHeaderSubtitle}>{subtitle}</Text>
      </View>
      {action && onAction ? (
        <Pressable style={styles.headerAction} onPress={onAction}>
          <Text style={styles.headerActionText}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function ProgramCard({ program }: { program: Program }) {
  return (
    <View style={styles.programCard}>
      <View style={styles.programIcon}>
        <Ionicons color="#FFD166" name={program.icon} size={22} />
      </View>
      <Text style={styles.programEyebrow}>{program.eyebrow}</Text>
      <Text style={styles.programTitle}>{program.title}</Text>
      <Text style={styles.programDescription}>{program.description}</Text>
      <Pressable style={styles.cardLink} onPress={() => openUrl(program.url)}>
        <Text style={styles.cardLinkText}>{program.cta}</Text>
        <Ionicons color="#FFD166" name="arrow-forward" size={16} />
      </Pressable>
    </View>
  );
}

function BeatCard({
  beat,
  isPlaying,
  onAddToCart,
  onPressPreview,
  onSelectLicense,
  selectedLicense,
}: {
  beat: Beat;
  isPlaying: boolean;
  onAddToCart: () => void;
  onPressPreview: () => void;
  onSelectLicense: (license: LicenseKey) => void;
  selectedLicense: LicenseKey;
}) {
  return (
    <View style={styles.beatCard}>
      <View style={styles.beatHeader}>
        <Pressable style={[styles.waveformButton, { borderColor: beat.color }]} onPress={onPressPreview}>
          <View style={styles.waveBars}>
            {[18, 32, 24, 42, 28, 36, 20].map((height, index) => (
              <View
                key={`${beat.id}-bar-${index}`}
                style={[
                  styles.waveBar,
                  {
                    height,
                    backgroundColor: isPlaying ? beat.color : '#4A4A4A',
                  },
                ]}
              />
            ))}
          </View>
          <View style={[styles.playBadge, { backgroundColor: beat.color }]}>
            <Ionicons color="#111" name={isPlaying ? 'pause' : 'play'} size={18} />
          </View>
        </Pressable>
        <View style={styles.beatInfo}>
          <Text style={styles.beatTitle}>{beat.title}</Text>
          <Text style={styles.beatProducer}>by {beat.producer}</Text>
          <Text style={styles.beatMeta}>
            {beat.bpm} BPM • {beat.key} • {beat.mood}
          </Text>
        </View>
      </View>
      <View style={styles.tagRow}>
        {beat.tags.map((tag) => (
          <Text key={tag} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
      <View style={styles.licenseRow}>
        {(Object.keys(licenseLabels) as LicenseKey[]).map((license) => {
          const isSelected = selectedLicense === license;
          return (
            <Pressable
              key={license}
              style={[styles.licensePill, isSelected && styles.licensePillActive]}
              onPress={() => onSelectLicense(license)}
            >
              <Text style={[styles.licensePillText, isSelected && styles.licensePillTextActive]}>
                {licenseLabels[license]}
              </Text>
              <Text style={[styles.licensePrice, isSelected && styles.licensePillTextActive]}>
                {formatCurrency(beat.licensePrices[license])}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable style={styles.addBeatButton} onPress={onAddToCart}>
        <Ionicons color="#111" name="cart" size={18} />
        <Text style={styles.addBeatButtonText}>Add license to cart</Text>
      </Pressable>
    </View>
  );
}

function ProductCard({
  icon,
  label,
  price,
  title,
}: {
  icon: IconName;
  label: string;
  price: string;
  title: string;
}) {
  return (
    <View style={styles.productCard}>
      <View style={styles.productArt}>
        <Ionicons color="#111" name={icon} size={42} />
      </View>
      <Text style={styles.productLabel}>{label}</Text>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <Pressable style={styles.smallButton} onPress={() => openUrl(MERCH_URL)}>
        <Text style={styles.smallButtonText}>Shop merch</Text>
      </Pressable>
    </View>
  );
}

function ActionRow({
  body,
  icon,
  onPress,
  title,
}: {
  body: string;
  icon: IconName;
  onPress: () => void;
  title: string;
}) {
  return (
    <Pressable style={styles.actionRow} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Ionicons color="#FFD166" name={icon} size={22} />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionBody}>{body}</Text>
      </View>
      <Ionicons color="#6F6F6F" name="chevron-forward" size={20} />
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {
    if (Platform.OS !== 'web') {
      Alert.alert('Unable to open link', url);
    }
  });
}

const styles = StyleSheet.create({
  actionBody: {
    color: '#A5A5A5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  actionIcon: {
    alignItems: 'center',
    backgroundColor: '#1D1B16',
    borderRadius: 18,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  actionList: {
    gap: 12,
  },
  actionRow: {
    alignItems: 'center',
    backgroundColor: '#151515',
    borderColor: '#252525',
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    padding: 16,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  addBeatButton: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 13,
  },
  addBeatButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '900',
  },
  app: {
    backgroundColor: '#090909',
    flex: 1,
  },
  beatCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
  },
  beatHeader: {
    flexDirection: 'row',
    gap: 14,
  },
  beatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  beatMeta: {
    color: '#A7A7A7',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  beatProducer: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  beatTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  bookPill: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 999,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bookPillText: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '900',
  },
  cardLink: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 16,
  },
  cardLinkText: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '900',
  },
  cartCard: {
    backgroundColor: '#111111',
    borderColor: '#343434',
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 4,
    padding: 18,
  },
  cartHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cartLine: {
    alignItems: 'center',
    borderBottomColor: '#242424',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  cartLineMeta: {
    color: '#A5A5A5',
    fontSize: 12,
    marginTop: 3,
  },
  cartLinePrice: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  cartLineRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  cartLineTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  cartSubtitle: {
    color: '#999999',
    fontSize: 13,
    marginTop: 2,
  },
  cartTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  cartTotal: {
    color: '#FFD166',
    fontSize: 22,
    fontWeight: '900',
  },
  contactCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 26,
    borderWidth: 1,
    marginTop: 18,
    padding: 18,
  },
  contactLine: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  contactText: {
    color: '#E9E9E9',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  contactTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  emptyCart: {
    color: '#999999',
    fontSize: 14,
    paddingVertical: 12,
  },
  eyebrow: {
    color: '#FFD166',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  featureBanner: {
    alignItems: 'center',
    backgroundColor: '#1B1710',
    borderColor: '#4C3D19',
    borderRadius: 28,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    marginTop: 20,
    padding: 18,
  },
  featureBody: {
    color: '#BFB7A5',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  featureIcon: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  headerAction: {
    borderColor: '#3A3321',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerActionText: {
    color: '#FFD166',
    fontSize: 12,
    fontWeight: '900',
  },
  hero: {
    backgroundColor: '#151515',
    borderColor: '#292929',
    borderRadius: 34,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 24,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  heroBody: {
    color: '#CFCFCF',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
  },
  heroGlow: {
    backgroundColor: '#FFD166',
    borderRadius: 90,
    height: 180,
    opacity: 0.1,
    position: 'absolute',
    right: -70,
    top: -50,
    width: 180,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1.4,
    lineHeight: 42,
    marginTop: 12,
  },
  infoBody: {
    color: '#C9C9C9',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 28,
    borderWidth: 1,
    marginTop: 8,
    padding: 18,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  licenseExplainer: {
    gap: 10,
    marginBottom: 16,
  },
  licenseInfo: {
    backgroundColor: '#121212',
    borderColor: '#292929',
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  licenseInfoBody: {
    color: '#A7A7A7',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  licenseInfoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  licensePill: {
    backgroundColor: '#202020',
    borderColor: '#333333',
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minWidth: 96,
    padding: 10,
  },
  licensePillActive: {
    backgroundColor: '#FFD166',
    borderColor: '#FFD166',
  },
  licensePillText: {
    color: '#EDEDED',
    fontSize: 11,
    fontWeight: '900',
  },
  licensePillTextActive: {
    color: '#111111',
  },
  licensePrice: {
    color: '#BDBDBD',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 5,
  },
  licenseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  logoSub: {
    color: '#8E8E8E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  outlineButton: {
    alignItems: 'center',
    borderColor: '#FFD166',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
    paddingVertical: 12,
  },
  outlineButtonText: {
    color: '#FFD166',
    fontSize: 14,
    fontWeight: '900',
  },
  planet: {
    borderRadius: 999,
    height: 54,
    opacity: 0.88,
    position: 'absolute',
    right: 18,
    top: 18,
    width: 54,
  },
  playBadge: {
    alignItems: 'center',
    borderRadius: 999,
    bottom: 10,
    height: 34,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    width: 34,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonFull: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 18,
    marginTop: 18,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '900',
  },
  productArt: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 26,
    height: 110,
    justifyContent: 'center',
    marginBottom: 14,
  },
  productCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 26,
    borderWidth: 1,
    flex: 1,
    minWidth: 150,
    padding: 16,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  productLabel: {
    color: '#FFD166',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  productPrice: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 8,
  },
  productTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 6,
  },
  programCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
  },
  programDescription: {
    color: '#B9B9B9',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  programEyebrow: {
    color: '#8D8D8D',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 14,
    textTransform: 'uppercase',
  },
  programGrid: {
    gap: 12,
  },
  programIcon: {
    alignItems: 'center',
    backgroundColor: '#211D13',
    borderRadius: 18,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  programTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 5,
  },
  roomCard: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 28,
    borderWidth: 1,
    flex: 1,
    minHeight: 220,
    minWidth: 154,
    overflow: 'hidden',
    padding: 18,
  },
  roomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  roomMeta: {
    color: '#8E8E8E',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 10,
    textTransform: 'uppercase',
  },
  roomMood: {
    color: '#C9C9C9',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
    marginTop: 6,
  },
  roomName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  roomSpecialty: {
    color: '#FFD166',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
    paddingRight: 42,
  },
  roomTopLine: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 62,
  },
  safeArea: {
    backgroundColor: '#090909',
    flex: 1,
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 112,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#3C3C3C',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  sectionBody: {
    color: '#BEBEBE',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  sectionHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 24,
  },
  sectionHeaderSubtitle: {
    color: '#A8A8A8',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  sectionHero: {
    backgroundColor: '#151515',
    borderColor: '#282828',
    borderRadius: 32,
    borderWidth: 1,
    marginBottom: 18,
    padding: 22,
  },
  sectionIcon: {
    alignItems: 'center',
    backgroundColor: '#FFD166',
    borderRadius: 20,
    height: 48,
    justifyContent: 'center',
    marginBottom: 16,
    width: 48,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 36,
    marginTop: 8,
  },
  smallButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginTop: 'auto',
    paddingVertical: 11,
  },
  smallButtonText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '900',
  },
  stat: {
    backgroundColor: '#111111',
    borderColor: '#242424',
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    padding: 14,
  },
  statLabel: {
    color: '#9D9D9D',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  tabBar: {
    backgroundColor: '#101010',
    borderColor: '#252525',
    borderRadius: 28,
    borderWidth: 1,
    bottom: 18,
    flexDirection: 'row',
    left: 18,
    paddingHorizontal: 8,
    paddingVertical: 10,
    position: 'absolute',
    right: 18,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  tabLabel: {
    color: '#8D8D8D',
    fontSize: 11,
    fontWeight: '800',
  },
  tabLabelActive: {
    color: '#FFD166',
  },
  tag: {
    backgroundColor: '#222222',
    borderRadius: 999,
    color: '#DADADA',
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  topBar: {
    alignItems: 'center',
    borderBottomColor: '#1F1F1F',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  waveBar: {
    borderRadius: 999,
    width: 5,
  },
  waveBars: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  waveformButton: {
    alignItems: 'center',
    backgroundColor: '#101010',
    borderRadius: 24,
    borderWidth: 1,
    height: 108,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 108,
  },
});
