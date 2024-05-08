import { supabase } from "@/utils/supabase";
import { sendMessage } from "./message";

export const googleLogin = async () => {
  sendMessage({ message: "login" });

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
  sendMessage({ message: "login" });

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

// 디버깅 용 로그아웃 함수
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (!!error) {
    alert("로그아웃 되었습니다.");
  } else console.log("logout >>>", error);
};

// 소셜 로그인 한 유저의 정보를 유저 table에 담는 함수
export const updateUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!!user) {
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
    insertRefrige(user);
    if (!error) console.log(data);
    else console.log("updateUser >>>", error);
  }
};

// 유저 table에서 로그인한 유저의 db정보를 모두 가져오는 함수
export const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!!user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user.identities[0].identity_data.provider_id);

    if (!error) {
      console.log(data);
      return data;
    } else console.log("getUserInfo >>>", error);
  }
};

// 냉장고 생성
export const insertRefrige = async (user) => {
  const { data, error } = await supabase
    .from("refrigerators")
    .select("*")
    .eq("user_id", user.identities[0].identity_data.provider_id);

  if (data.length !== 0) console.log("유저가 이미 냉장고를 가지고 있습니다.");
  else {
    const { data: refrige, error } = await supabase
      .from("refrigerators")
      .insert([
        {
          user_id: user.identities[0].identity_data.provider_id,
          refrige_create_day: user.identities[0].created_at,
        },
      ])
      .select();

    if (!error) console.log(refrige);
    else console.log("insertRefrige >>>", error);
  }
};
