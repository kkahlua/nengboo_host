import { useUserStore } from "@/store/user";
import pretendard from "@/styles/fonts";
import {
  getGoogleUser,
  getGoogleUserInfo,
  getKakaoUser,
  getKakaoUserInfo,
} from "@/utils/actions";
import { useEffect } from "react";

export default function MainPage() {
  const { user, updateUser } = useUserStore();

  const check = () => {
    console.log(user);
  };

  useEffect(() => {
    const checkUserStore = async () => {
      await getGoogleUser();
      await getKakaoUser();
      const google = await getGoogleUserInfo();
      const kakao = await getKakaoUserInfo();
      if (!user) !!google ? updateUser(google) : updateUser(kakao);
    };
    checkUserStore();
  }, []);

  return (
    <div className={pretendard.className}>
      <button onClick={check}>console</button>
    </div>
  );
}
