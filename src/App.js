import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";

import { ThemeProvider } from "./core/providers/theme";

import Routes from "./routes";
import { LocaleContext } from "./globalContext/locale/localeProviders";
import intl from "./locale";
import variables from "./themes/base/styles/variables";

/*
  Theme Provider for components library used can be injected to boilerplate's Theme Provider so that style variables
  can be in sync
*/
function UiComponentsProvider({ children, ...restProps }) {
  const { styleVariables } = restProps;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: styleVariables?.primaryBg,
          colorTextBase: styleVariables?.textDefault,
          fontFamily: styleVariables?.fontFamilyRegular,
          fontSize: parseInt(styleVariables?.fontSizeNormal),
          colorError: styleVariables?.error,
        },
        components: {
          Descriptions: {
            titleColor: variables.textBold,
            contentColor: variables.inputLabel,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

function App() {
  const [localeState] = useContext(LocaleContext);

  /*
  eg. to display how locale can be changed
  below line depicts how localeDispatch can be taken out of context
  const [localeState, localeDispatch] = useContext(LocaleContext);
  
  useEffect(() => {
    // can be executed on any event for eg: button click of language switcher
    localeDispatch(setLocale('ar'))
  }, []);
  */

  return (
    <ThemeProvider
      UiComponentsProvider={UiComponentsProvider}
      initial="primary"
    >
      <IntlProvider
        messages={intl[localeState?.locale]}
        locale={localeState?.locale}
        defaultLocale="en"
      >
        <div className="app">
          <BrowserRouter basename="/manager">
            <Routes />
          </BrowserRouter>
        </div>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
