import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Assuming supabaseClient is setup here
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
// Helper function to sync user profile with your backend
// IMPORTANT: I need supabaseUserId,

const apiUrl = import.meta.env.VITE_API_URL;

async function syncUserProfile(user) {
  if (!user) return;

  // Extract relevant data (adjust field names if needed based on provider)
  const userId = user.id;
  console.log(userId);
  const username =
    user.user_metadata?.user_name ||
    user.user_metadata?.full_name ||
    user.email; // Fallback logic for username
  const avatarUrl = user.user_metadata?.avatar_url;

  if (!userId || !username) {
    console.warn("Missing userId or username for backend sync.");
    return;
  }

  console.log("Attempting to sync user with backend:", {
    userId,
    username,
    avatarUrl,
  });

  try {
    // **1. Check if user exists (Optional but Recommended):**
    // You might want to check your backend first to avoid errors or duplicate entries.
    // const checkResponse = await fetch(`/api/users/check/${userId}`);
    // if (checkResponse.ok && await checkResponse.json().exists) {
    //   console.log('User already exists in backend.');
    //   return; // User already exists, no need to create
    // }

    // **2. Create user if they don't exist:**
    const response = await fetch(`${apiUrl}/api/v1/users/sync-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include Authorization header if your backend requires it
        // 'Authorization': `Bearer ${session.access_token}` // If using Supabase token
      },
      body: JSON.stringify({
        supabaseUserId: userId,
        username: username,
        avatarUrl: avatarUrl,
        // Add any other fields your backend expects
      }),
    });

    if (!response.ok) {
      // Handle specific error statuses (e.g., 409 Conflict if user already exists)
      if (response.status === 409) {
        console.log("User likely already exists in backend (Conflict).");
      } else {
        const errorData = await response.json().catch(() => ({})); // Try to get error details
        console.error("Backend sync failed:", response.status, errorData);
        throw new Error(`Backend sync failed: ${response.status}`);
      }
    } else {
      const result = await response.json();
      console.log("Backend sync successful:", result);
    }
  } catch (error) {
    console.error("Error syncing user profile with backend:", error);
    // Handle fetch error (network issue, etc.)
  }
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();

  useEffect(() => {
    // Check initial session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        console.log("i am session", session);
        setUser(session?.user ?? null);
        console.log(user);
        dispatch(setUserDetails(session?.user ?? null));
        setLoading(false); // Set loading to false after initial check
        // Potentially sync here too if needed, though onAuthStateChange often covers it
        // if (session?.user) {
        //   syncUserProfile(session.user);
        // }
      })
      .catch(() => setLoading(false)); // Handle potential errors

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // Make the callback async
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setLoading(false); // Also update loading state on auth changes

        // If user logged in, try to sync profile with backend
        // Only trigger on explicit SIGNED_IN or TOKEN_REFRESHED (if metadata might update)
        if (_event === "SIGNED_IN" && currentUser) {
          await syncUserProfile(currentUser);
        }
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Function to handle Twitter sign-in
  async function signInWithTwitter() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      // Optional: Add redirect URL if needed
      // options: {
      //   redirectTo: window.location.origin,
      // },
    });
    if (error) {
      console.error("Error signing in with Twitter:", error.message);
      // Handle error appropriately in the UI if needed
    }
  }

  // Function to handle sign-out
  async function signOut() {
    setLoading(true); // Optionally set loading true during sign out
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      // Handle error appropriately
    }
    // user state will be updated via onAuthStateChange
    // setLoading will be set to false by onAuthStateChange
  }

  return { user, loading, signInWithTwitter, signOut };
}
