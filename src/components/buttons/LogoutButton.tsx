// components/LogoutButton.js
import useAuthStore from '@/store/authStore';

export default function LogoutButton() {
  const { logout } = useAuthStore();

  return <button onClick={logout}>Logout</button>;
}