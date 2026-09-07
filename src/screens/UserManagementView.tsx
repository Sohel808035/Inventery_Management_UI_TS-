import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import {
  ChevronLeft,
  Menu,
  User,
  Plus,
  ListFilter,
  UserPlus,
  X,
  Trash2,
} from 'lucide-react-native';
import { ThemeColors, ThemeMode } from '../theme/landingTheme';
import { ThemeToggle } from '../components/ThemeToggle';
import { PulseFAB } from '../components/PulseFAB';

interface UserManagementViewProps {
  mode: ThemeMode;
  onToggleTheme: () => void;
  onBack: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface UserRoleItem {
  id: string;
  title: string;
  count: number;
}

interface MemberItem {
  id: string;
  name: string;
  username: string;
}

const initialMembers: Record<string, MemberItem[]> = {
  admin: [
    { id: '1', name: 'Anshu', username: 'anshu' },
    { id: '2', name: 'Neha singh', username: 'nehasingh' },
    { id: '3', name: 'Rohan Kohad', username: 'rohankohad' },
    { id: '4', name: 'Naitik Mishra', username: 'Naitik Mishra' },
    { id: '5', name: 'Shyam', username: 'shyam' },
    { id: '6', name: 'Swati', username: 'swati' },
    { id: '7', name: 'Reeta', username: 'reeta' },
    { id: '8', name: 'Monika', username: 'monika' },
    { id: '9', name: 'Shubham', username: 'shubham' },
  ],
  gsn: [
    { id: '1', name: 'Aarav Sharma', username: 'aarav' },
    { id: '2', name: 'Priya Patel', username: 'priyap' },
    { id: '3', name: 'Vikram Malhotra', username: 'vikram' },
    { id: '4', name: 'Sneha Verma', username: 'snehav' },
    { id: '5', name: 'Amit Roy', username: 'amitroy' },
  ],
  grin: [
    { id: '1', name: 'Rajesh Kumar', username: 'rajeshk' },
    { id: '2', name: 'Kavita Singh', username: 'kavitas' },
    { id: '3', name: 'Deepak Joshi', username: 'deepakj' },
    { id: '4', name: 'Ananya Gupta', username: 'ananyag' },
  ],
  purchase_mgr: [
    { id: '1', name: 'Sunil Rao', username: 'sunilr' },
    { id: '2', name: 'Megha Nair', username: 'meghan' },
  ],
  store_mgr: [
    { id: '1', name: 'Pankaj Deshmukh', username: 'pankajd' },
    { id: '2', name: 'Ritu Sharma', username: 'ritus' },
    { id: '3', name: 'Manish Pandey', username: 'manishp' },
  ],
  general_mgr: [
    { id: '1', name: 'Sanjay Aggarwal', username: 'sanjaya' },
  ],
  auditor: [
    { id: '1', name: 'Tarun Saxena', username: 'taruns' },
    { id: '2', name: 'Pooja Mehta', username: 'poojam' },
    { id: '3', name: 'Alok Mishra', username: 'alokm' },
    { id: '4', name: 'Nisha Thakur', username: 'nishat' },
  ],
  account_mgr: [
    { id: '1', name: 'Varun Grover', username: 'varung' },
    { id: '2', name: 'Divya Kapoor', username: 'divyak' },
  ],
};

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  mode,
  onToggleTheme,
  onBack,
}) => {
  const theme = ThemeColors[mode];
  const isDark = mode === 'dark';

  const [roles, setRoles] = useState<UserRoleItem[]>([
    { id: 'admin', title: 'Admin', count: 9 },
    { id: 'gsn', title: 'GSN', count: 5 },
    { id: 'grin', title: 'GRIN', count: 4 },
    { id: 'purchase_mgr', title: 'Purchase Manager', count: 2 },
    { id: 'store_mgr', title: 'Store Manager', count: 3 },
    { id: 'general_mgr', title: 'General Manager', count: 1 },
    { id: 'auditor', title: 'Auditor', count: 4 },
    { id: 'account_mgr', title: 'Account Manager', count: 2 },
  ]);

  const [membersByRole, setMembersByRole] = useState<Record<string, MemberItem[]>>(initialMembers);
  const [selectedRoleForDirectory, setSelectedRoleForDirectory] = useState<UserRoleItem | null>(null);

  // Modal State for "Add User" popup
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRoleItem | null>(null);

  // Form Field Inputs
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpenAddModal = (role: UserRoleItem) => {
    setSelectedRole(role);
    setFullName(role.title === 'Admin' ? 'Anand Mahajan' : '');
    setUsername('');
    setPassword('');
    setIsAddModalOpen(true);
  };

  const handleCreateUser = () => {
    if (!selectedRole) return;

    const userDisplayName = fullName.trim() || 'New User';
    const newUsername = username.trim() || userDisplayName.toLowerCase().replace(/\s+/g, '');

    const newMember: MemberItem = {
      id: Date.now().toString(),
      name: userDisplayName,
      username: newUsername,
    };

    setMembersByRole((prev) => ({
      ...prev,
      [selectedRole.id]: [...(prev[selectedRole.id] || []), newMember],
    }));

    setRoles((prev) =>
      prev.map((r) => (r.id === selectedRole.id ? { ...r, count: r.count + 1 } : r))
    );

    Alert.alert(
      'Success',
      `User "${userDisplayName}" created successfully with role "${selectedRole.title}".`
    );

    setIsAddModalOpen(false);
  };

  const handleViewRoleList = (role: UserRoleItem) => {
    setSelectedRoleForDirectory(role);
  };

  const handleDeleteMember = (member: MemberItem) => {
    if (!selectedRoleForDirectory) return;
    const roleId = selectedRoleForDirectory.id;

    Alert.alert(
      'Delete Member',
      `Are you sure you want to remove "${member.name}" from ${selectedRoleForDirectory.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMembersByRole((prev) => ({
              ...prev,
              [roleId]: (prev[roleId] || []).filter((m) => m.id !== member.id),
            }));
            setRoles((prev) =>
              prev.map((r) => (r.id === roleId ? { ...r, count: Math.max(0, r.count - 1) } : r))
            );
          },
        },
      ]
    );
  };

  const handleFabPress = () => {
    Alert.alert(
      'User Management Voice Assistant',
      'Trigger voice command for User Directory:',
      [
        { text: 'Add Admin User', onPress: () => handleOpenAddModal(roles[0]) },
        { text: 'View Admin List', onPress: () => handleViewRoleList(roles[0]) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const currentMembers = selectedRoleForDirectory
    ? membersByRole[selectedRoleForDirectory.id] || []
    : [];

  return (
    <View style={[styles.outerWrapper, { backgroundColor: isDark ? '#000000' : '#E2E8F0' }]}>
      {/* Mobile Frame Container (390 x 844 px) */}
      <View
        style={[
          styles.mobileContainer,
          {
            backgroundColor: theme.screenBg,
            borderColor: isDark ? '#1E293B' : '#CBD5E1',
          },
        ]}
      >
        {/* Background Atmosphere */}
        {!isDark && (
          <>
            <View style={styles.lightAmberGlow} />
            <View style={styles.lightSageGlow} />
          </>
        )}
        {isDark && <View style={styles.darkCyanGlow} />}

        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.headerBg }]}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={[styles.backBtnCircle, { backgroundColor: theme.menuBg }]}
              onPress={() => {
                if (selectedRoleForDirectory) {
                  setSelectedRoleForDirectory(null);
                } else {
                  onBack();
                }
              }}
              activeOpacity={0.8}
            >
              <ChevronLeft size={20} color={theme.headerText} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: theme.headerText }]}>
              User Management
            </Text>
          </View>

          <View style={styles.headerRight}>
            <ThemeToggle mode={mode} onToggle={onToggleTheme} />

            <TouchableOpacity
              style={[styles.menuBtn, { backgroundColor: theme.menuBg }]}
              onPress={() => {
                if (selectedRoleForDirectory) {
                  setSelectedRoleForDirectory(null);
                } else {
                  onBack();
                }
              }}
              activeOpacity={0.8}
            >
              <Menu size={18} color={theme.menuIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Area */}
        {selectedRoleForDirectory ? (
          /* ================= MEMBER DIRECTORY VIEW (e.g. Admin Members) ================= */
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {currentMembers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  No active members in {selectedRoleForDirectory.title}.
                </Text>
              </View>
            ) : (
              currentMembers.map((member, index) => (
                <View
                  key={member.id}
                  style={[
                    styles.memberCard,
                    {
                      backgroundColor: isDark ? 'rgba(4, 25, 34, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                      borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                    },
                  ]}
                >
                  {/* Left: Member Name and Username */}
                  <View style={styles.memberInfoGroup}>
                    <Text style={[styles.memberNameText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                      {index + 1}. {member.name}
                    </Text>
                    <Text style={[styles.memberUsernameText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                      @{member.username}
                    </Text>
                  </View>

                  {/* Right: Red Circle Trash Delete Button */}
                  <TouchableOpacity
                    style={styles.deleteCircleBtn}
                    onPress={() => handleDeleteMember(member)}
                    activeOpacity={0.8}
                  >
                    <Trash2 size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        ) : (
          /* ================= ROLE LIST VIEW ================= */
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {roles.map((role) => (
              <View
                key={role.id}
                style={[
                  styles.roleCard,
                  {
                    backgroundColor: isDark ? 'rgba(4, 21, 28, 0.95)' : 'rgba(255, 255, 255, 0.85)',
                    borderColor: isDark ? 'rgba(0, 229, 255, 0.2)' : '#CBD5E1',
                  },
                ]}
              >
                {/* Card Left: User Icon & Role Title */}
                <View style={styles.cardLeftContent}>
                  <View
                    style={[
                      styles.userIconBadge,
                      {
                        borderColor: isDark ? '#A3E635' : '#2563EB',
                        backgroundColor: isDark ? 'rgba(163, 230, 53, 0.1)' : '#DBEAFE',
                      },
                    ]}
                  >
                    <User size={15} color={isDark ? '#A3E635' : '#2563EB'} />
                  </View>

                  <Text style={[styles.roleTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    {role.title}
                  </Text>
                </View>

                {/* Card Right: Stacked Action Rows (+ Add & List Filter) */}
                <View style={styles.cardRightActions}>
                  {/* Top Action Row: Plus Button */}
                  <View style={styles.actionRow}>
                    <Text style={[styles.bulletDot, { color: isDark ? '#A3E635' : '#2563EB' }]}>•</Text>
                    <TouchableOpacity
                      style={[
                        styles.plusBtnSquare,
                        {
                          backgroundColor: isDark ? '#A3E635' : '#2563EB',
                        },
                      ]}
                      onPress={() => handleOpenAddModal(role)}
                      activeOpacity={0.8}
                    >
                      <Plus size={16} color={isDark ? '#000000' : '#FFFFFF'} />
                    </TouchableOpacity>
                  </View>

                  {/* Bottom Action Row: List Filter Button */}
                  <View style={styles.actionRow}>
                    <Text style={[styles.bulletDot, { color: isDark ? '#64748B' : '#94A3B8' }]}>•</Text>
                    <TouchableOpacity
                      style={[
                        styles.listBtnSquare,
                        {
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9',
                          borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                        },
                      ]}
                      onPress={() => handleViewRoleList(role)}
                      activeOpacity={0.8}
                    >
                      <ListFilter size={15} color={isDark ? '#94A3B8' : '#475569'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Bottom Right Glowing Microphone FAB */}
        <PulseFAB mode={mode} onPress={handleFabPress} />

        {/* ================= ADD USER MODAL POPUP ================= */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlayBackdrop}
            activeOpacity={1}
            onPress={() => setIsAddModalOpen(false)}
          >
            <View
              style={[
                styles.modalCardContainer,
                {
                  backgroundColor: isDark ? '#051319' : '#FFFFFF',
                  borderColor: isDark ? 'rgba(0, 229, 255, 0.3)' : '#CBD5E1',
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              {/* Modal Header Bar */}
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalHeaderTitleGroup}>
                  <View
                    style={[
                      styles.modalIconBadge,
                      {
                        backgroundColor: isDark ? '#000000' : '#F1F5F9',
                        borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                      },
                    ]}
                  >
                    <UserPlus size={16} color={isDark ? '#FFFFFF' : '#0F172A'} />
                  </View>
                  <Text style={[styles.modalHeaderTitleText, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    Add {selectedRole?.title || 'User'}
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.modalCloseBtnCircle,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F1F5F9' },
                  ]}
                  onPress={() => setIsAddModalOpen(false)}
                  activeOpacity={0.8}
                >
                  <X size={15} color={isDark ? '#94A3B8' : '#64748B'} />
                </TouchableOpacity>
              </View>

              <View style={[styles.modalDivider, { backgroundColor: isDark ? '#1C3E49' : '#E2E8F0' }]} />

              {/* Form Input 1: Full name */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Full name
                </Text>
                <View
                  style={[
                    styles.modalInputWrapper,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                      borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.modalTextInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                    placeholder={selectedRole?.title === 'Admin' ? 'Anand Mahajan' : 'Enter full name'}
                    placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>

              {/* Form Input 2: Username */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Username
                </Text>
                <View
                  style={[
                    styles.modalInputWrapper,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                      borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.modalTextInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                    placeholder="Enter username"
                    placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>
              </View>

              {/* Form Input 3: Password */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  Password
                </Text>
                <View
                  style={[
                    styles.modalInputWrapper,
                    {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#FFFFFF',
                      borderColor: isDark ? '#1C3E49' : '#CBD5E1',
                    },
                  ]}
                >
                  <TextInput
                    style={[styles.modalTextInput, { color: isDark ? '#FFFFFF' : '#0F172A' }]}
                    placeholder="Password"
                    placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              {/* Create User Button */}
              <TouchableOpacity
                style={[
                  styles.createUserButton,
                  {
                    backgroundColor: isDark ? '#A3E635' : '#2563EB',
                  },
                ]}
                onPress={handleCreateUser}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.createUserButtonText,
                    { color: isDark ? '#000000' : '#FFFFFF' },
                  ]}
                >
                  Create User
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileContainer: {
    width: Math.min(SCREEN_WIDTH, 390),
    height: 844,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    position: 'relative',
  },
  darkCyanGlow: {
    position: 'absolute',
    top: 60,
    left: '5%',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#00E5FF',
    opacity: 0.1,
  },
  lightAmberGlow: {
    position: 'absolute',
    top: -20,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FDE68A',
    opacity: 0.55,
  },
  lightSageGlow: {
    position: 'absolute',
    bottom: 40,
    left: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#DCFCE7',
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    zIndex: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtnCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
    gap: 12,
  },
  roleCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 74,
  },
  cardLeftContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  userIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitleText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  cardRightActions: {
    gap: 6,
    alignItems: 'flex-end',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bulletDot: {
    fontSize: 14,
    fontWeight: '700',
  },
  plusBtnSquare: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listBtnSquare: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= MEMBER DIRECTORY STYLES ================= */
  memberCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 64,
  },
  memberInfoGroup: {
    flexDirection: 'column',
    gap: 4,
  },
  memberNameText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  memberUsernameText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  deleteCircleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
  },

  /* ================= MODAL POPUP STYLES ================= */
  modalOverlayBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  modalCardContainer: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    borderTopWidth: 1.5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    gap: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeaderTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderTitleText: {
    fontSize: 17,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  modalCloseBtnCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDivider: {
    height: 1,
    width: '100%',
    opacity: 0.6,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  modalInputWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  modalTextInput: {
    fontSize: 14,
    fontFamily: 'Inter',
    padding: 0,
  },
  createUserButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  createUserButtonText: {
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
});
