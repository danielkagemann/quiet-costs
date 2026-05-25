import { WelcomeScreen } from "@/components/WelcomeScreen";
import { useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import { Configuration } from "@/utils/configuration";
import { OverviewScreen } from "@/components/OverviewScreen";
import { Loading } from "@/components/Loading";

export default function HomeScreen() {
  const [welcomeSeen, setWelcomeSeen] = useState<boolean | null>(null);

  useEffect(() => {
    Storage.get<boolean>(Configuration.storage.welcomeSeen).then((value) => {
      setWelcomeSeen(value ?? false);
    });
  }, []);

  if (welcomeSeen === null) return <Loading />;

  if (!welcomeSeen) {
    return (
      <WelcomeScreen
        onFinish={async () => {
          await Storage.set(Configuration.storage.welcomeSeen, true);
          setWelcomeSeen(true);
        }}
      />
    );
  }

  return <OverviewScreen />;
}
