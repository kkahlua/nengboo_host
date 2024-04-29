import { supabase } from "@/utils/supabase";

export const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  // if (data) alert("페이지를 이동합니다");
  // if (error) console.log("error >>>", error);
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
  console.log(user);
};
