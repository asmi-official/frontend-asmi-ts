import React, { useState } from 'react';
import { Container, Box, Alert } from '@mui/material';
import { CheckCircle, Stars, Business, People } from '@mui/icons-material';

// Import components
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import StatsCards from '../../components/Profile/StatsCards';
import ProfileInfoForm from '../../components/Profile/ProfileInfoForm';
import SecuritySettings from '../../components/Profile/SecuritySettings';

type UserRole = 'admin' | 'agent' | 'affiliate';

interface UserProfile {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  avatar?: string;
  joinDate: string;
  stats?: {
    totalSales?: number;
    totalCommission?: number;
    activeReferrals?: number;
    totalOrders?: number;
  };
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - nanti akan diganti dengan data dari API
  const [profile, setProfile] = useState<UserProfile>({
    role: 'agent', // Bisa diubah ke 'admin', 'agent', atau 'affiliate'
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '08123456789',
    companyName: 'PT. Example Company',
    avatar: '',
    joinDate: '2024-01-15',
    stats: {
      totalSales: 15000000,
      totalCommission: 2500000,
      activeReferrals: 25,
      totalOrders: 150,
    },
  });

  const [formData, setFormData] = useState(profile);
  const [newPassword, setNewPassword] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setNewPassword('');
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (field: keyof UserProfile) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const getRoleInfo = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrator',
          color: '#8b0000' as const,
          icon: <Stars />,
        };
      case 'agent':
        return {
          label: 'Agent',
          color: '#8b0000' as const,
          icon: <Business />,
        };
      case 'affiliate':
        return {
          label: 'Affiliate',
          color: '#8b0000' as const,
          icon: <People />,
        };
    }
  };

  const roleInfo = getRoleInfo(profile.role);

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {showSuccess && (
          <Alert
            severity="success"
            icon={<CheckCircle />}
            sx={{ mb: 3 }}
            onClose={() => setShowSuccess(false)}
          >
            Profile berhasil diperbarui!
          </Alert>
        )}

        {/* Header */}
        <ProfileHeader
          profile={profile}
          roleInfo={roleInfo}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        {/* Stats Cards */}
        {profile.stats && <StatsCards role={profile.role} stats={profile.stats} />}

        {/* Profile Info & Security */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 3,
          }}
        >
          <ProfileInfoForm
            role={profile.role}
            formData={formData}
            isEditing={isEditing}
            onChange={handleChange}
          />

          <SecuritySettings
            roleInfo={roleInfo}
            newPassword={newPassword}
            showPassword={showPassword}
            isEditing={isEditing}
            onPasswordChange={(e) => setNewPassword(e.target.value)}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
}
