import { SupabaseClient } from '@supabase/supabase-js';
interface LoginButtonProps {
    redirectTo?: string;
    className?: string;
    supabaseClient?: SupabaseClient;
}
export default function LoginButton({ redirectTo, className, supabaseClient }: LoginButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
