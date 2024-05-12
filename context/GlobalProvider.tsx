import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { router, usePathname } from "expo-router";
import { getCurrentUser } from "../controllers/auth";
import { removeAuth, setAuth } from "../lib/myFunction";
import { ConfirmDialog, WarningDialog } from "../components/Alert";

interface GlobalContextType {
  isLoading: boolean;

  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

  user: any; // Ganti 'any' dengan tipe data yang sesuai dengan struktur user Anda
  setUser: React.Dispatch<React.SetStateAction<any>>;

  confirmOptions: any;
  setConfirmOptions: React.Dispatch<React.SetStateAction<any>>;

  warningOptions: any;
  setWarningOptions: React.Dispatch<React.SetStateAction<any>>;
}

const defaultContextValue: GlobalContextType = {
  isLoading: true,
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  confirmOptions: {},
  setConfirmOptions: () => {},
  warningOptions: {},
  setWarningOptions: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmOptions, setConfirmOptions] = useState({
    title: "",
    message: "",
    button: {
      confirm: {
        customText: "",
        onPress: () => {},
      },
      cancel: {
        customText: "",
        onPress: () => {},
      },
    },
    visibility: false,
  });
  const [warningOptions, setWarningOptions] = useState({
    title: "",
    message: "",
    button: {
      confirm: {
        customText: "",
        onPress: () => {},
      },
    },
    visibility: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      getCurrentUser()
        .then((res: any) => {
          if (res) {
            setIsLoggedIn(true);
            setUser(res.data);
            setAuth(res.data);
          } else {
            setIsLoggedIn(false);
            setUser(null);
            removeAuth();
            if (pathname != "/") {
              router.replace("/");
            }
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser(null);
          removeAuth();

          if (pathname != "/") {
            router.replace("/sign-in");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  const contextValue: GlobalContextType = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    isLoading,
    confirmOptions,
    setConfirmOptions,
    warningOptions,
    setWarningOptions,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <ConfirmDialog options={confirmOptions} />
      <WarningDialog options={warningOptions} />
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
