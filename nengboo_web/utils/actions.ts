import { supabase } from "@/utils/supabase";

export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/main",
    },
  });
  getGoogleUser();
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!!error) {
    alert("로그아웃 되었습니다.");
  } else console.log("error >>>", error);
};

export const getGoogleUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("users")
    .upsert([
      {
        user_id: user.identities[0].identity_data.provider_id,
        user_email: user.identities[0].identity_data.email,
        user_name: user.identities[0].identity_data.name,
        user_create_day: user.identities[0].created_at,
      },
    ])
    .select();

  if (!error) console.log(data);
  else console.log("error >>>", error);
};

export const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.identities[0].identity_data.provider_id);

  if (!error) {
    console.log(data);
    return data;
  } else console.log("error >>>", error);
};
