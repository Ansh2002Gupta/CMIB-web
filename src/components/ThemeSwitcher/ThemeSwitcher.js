import React, { useContext } from 'react'
import { Button } from 'antd'
import { ThemeContext } from 'core/providers/theme'

/*
  This is just a sample component to depict behavour of themes and how we can check all the themes we have in our system
  and how we can switch between themes using theme provider.

  To set theme Page wise trigger `setTheme` on Page mount hook over Page component.

  This Component can be removed while development of project
*/
function ThemeSwitcher() {
  const { themes, setTheme } = useContext(ThemeContext)
  return (
    <div className="flex" style={{ marginRight: '10px' }}>
      {
        themes?.all?.map((val, index) => (
          <div key={index}>
            <Button type={themes?.active === val?.name ? 'primary' : ''} style={{ marginRight: '10px' }} onClick={() => setTheme(val?.name)}>
              {val?.name}
            </Button>
          </div>
        ))
      }
    </div>
  )
}

export default ThemeSwitcher
