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
};

export const kakaoLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/main",
    },
  });
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!!error) {
    alert("로그아웃 되었습니다.");
  } else console.log("logout >>>", error);
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
  else console.log("getGoogleUser >>>", error);
};

export const getKakaoUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("users")
    .upsert([
      {
        user_id: user.user_metadata.provider_id,
        user_email: user.user_metadata.email,
        user_name: user.user_metadata.user_name,
        user_create_day: user.confirmed_at,
      },
    ])
    .select();

  if (!error) console.log(data);
  else console.log("getKakaoUser >>>", error);
};

export const getGoogleUserInfo = async () => {
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
  } else console.log("getGoogleUserInfo >>>", error);
};

export const getKakaoUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.user_metadata.provider_id);

  if (!error) {
    console.log(data);
    return data;
  } else console.log("getKakaoUserInfo >>>", error);
};
