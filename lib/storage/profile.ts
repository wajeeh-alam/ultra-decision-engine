import { demoProfile } from '@/data/demo-profile';
import { studentProfileSchema, type StudentProfile } from '@/schemas/student';

const PROFILE_KEY = 'ultra-decision-profile';

export function getStoredProfile(): StudentProfile {
  if (typeof window === 'undefined') return demoProfile;
  try {
    const value = window.localStorage.getItem(PROFILE_KEY);
    return value ? studentProfileSchema.parse(JSON.parse(value)) : demoProfile;
  } catch {
    return demoProfile;
  }
}

export function saveProfile(profile: StudentProfile) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('ultra-profile-change'));
}

export function resetProfile() {
  window.localStorage.removeItem(PROFILE_KEY);
  window.dispatchEvent(new Event('ultra-profile-change'));
}
