import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  // Fetch profile by user ID
  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  // Create or update profile
  async upsertProfile(profile: ProfileInsert | ProfileUpdate): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        ...profile,
        last_updated: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting profile:', error);
      return null;
    }

    return data;
  },

  // Update specific profile fields
  async updateProfileFields(
    userId: string, 
    updates: Partial<ProfileUpdate>
  ): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile fields:', error);
      return null;
    }

    return data;
  },

  // Upload avatar
  async uploadAvatar(
    userId: string, 
    file: File
  ): Promise<string | null> {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random()}.${fileExt}`;
    const filePath = `${userId}/avatar/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Update profile with avatar URL
    await this.updateProfileFields(userId, { avatar_url: publicUrl });

    return publicUrl;
  },

  // Validate and sanitize profile data
  validateProfileData(profile: Partial<ProfileInsert>): ProfileInsert {
    return {
      user_id: profile.user_id || '',
      name: profile.name || '',
      email: profile.email || '',
      bio: profile.bio || '',
      location: profile.location || '',
      occupation: profile.occupation || '',
      avatar_url: profile.avatar_url || '',
      skills: profile.skills || null,
      achievements: profile.achievements || null,
      social_links: profile.social_links || null,
      professional_interests: profile.professional_interests || [],
      languages: profile.languages || [],
      contact_preferences: profile.contact_preferences || null,
      details: profile.details || null
    };
  }
};
