import { useUserStore } from "@/store/user";
import pretendard from "@/styles/fonts";
import { getUserInfo } from "@/utils/actions";
import { useEffect } from "react";

export default function MainPage() {
  const { user, updateUser } = useUserStore();

  const check = () => {
    console.log(user);
  };

  useEffect(() => {
    const checkUserStore = async () => {
      const data = await getUserInfo();
      if (!user) updateUser(data);
    };
    checkUserStore();
  }, []);

  return (
    <div className={pretendard.className}>
      <button onClick={check}>console</button>
    </div>
  );
}
