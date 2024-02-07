import React, { useState, useCallback, useEffect, useMemo } from 'react'
import ThemeContext from "./Context";
import * as themesConfig from '../../../themes'
import { hasClass, addClass, removeClass } from '../../helpers/domCss'

const findTheme = (themes, name) => themes?.all?.find((v) => v.name === name)

function getStyleVariables(_themes, theme) {
  const themes = JSON.parse(JSON.stringify(_themes));
  const findedTheme = findTheme(themes, theme)
  let variables = {}
  if (findedTheme) {
    variables = findedTheme?.variables;
    if(findedTheme?.extend) {
      let _theme = findTheme(themes, findedTheme?.extend)
      while (_theme?.variables) {
        variables = { ..._theme.variables, ...variables };
        _theme = findTheme(themes, _theme?.extend)
      }
    }
  }
  return variables
}

function ThemeProvider({ children, UiComponentsProvider, initial = 'base' }) {
  // push all theme names into an array
  const allThemes = [...(Object.keys(themesConfig || {})?.map((themeConfigKey) => ({...themesConfig[themeConfigKey]})))]  
  // create themes state { all = all available themes, active = current active theme }
  const [themes, setThemes] = useState({ all: allThemes, active: initial })

  const styleVariables = useMemo(() => {
    return getStyleVariables(themes, themes?.active)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themes?.active])
  
  // set style variables with respect to each selector
  const applyThemeOnDom = useCallback((themeName, styleVariables) => {
    const rootEle = document.getElementById('root');
    const { all: _allThemes } = themes || {};
    if (hasClass(rootEle, themeName)) {
      return
    }
    _allThemes.forEach((_theme) => {
      removeClass(rootEle, _theme.name)
    })
    const el = addClass(rootEle, themeName)
    el.style = {}
    Object.entries(styleVariables)?.forEach((styleVariable) => {
      el.style.setProperty(`--${styleVariable[0]}`, styleVariable[1]);
    })
  }, [themes])

  useEffect(() => {
    if (themes?.active) {
      applyThemeOnDom(themes?.active, styleVariables)
    }  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themes?.active])

  const setTheme = useCallback((themeName = '') => {
    setThemes((_themes) => {
      return ({ ..._themes, active: themeName })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getImage = useCallback((name = '', _theme) => {
      
      const activeTheme = themes?.all.find((theme) => {
          return theme.name === _theme || themes.active;
      })
      if (activeTheme?.images?.[name]) {
        return activeTheme?.images?.[name];
      }
      if(activeTheme?.extend) {
        return getImage(name, activeTheme?.extend)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themes?.all, themes.active])

  const UiProvider = UiComponentsProvider || React.Fragment
  return (
    <ThemeContext.Provider value={{ themes, setTheme, getImage }}>
      <UiProvider styleVariables={styleVariables}>
        {children}
      </UiProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;