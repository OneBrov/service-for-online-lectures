import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box height='100%'  display='flex' 
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box height='100%'  display='flex'> 
          {children}
        </Box>
      )}
    </Box>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

type tab = {name: string, content: React.ReactNode }

interface BasicTabsProps {
  content: tab[]
}

export const BasicTabs:React.FC<BasicTabsProps> = ({
  content
}) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box  sx={{ borderBottom: 1, borderColor: 'divider',}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {content.map((tab, it) => 
            <Tab key={tab.name} label={tab.name} {...a11yProps(it)} />
          )}
        </Tabs>
      </Box>
      <Box display='flex' flex='auto' minHeight='0' width='100%'>
        {content.map((tab, it) => 
          <TabPanel  key={tab.name} value={value} index={it}>
            {tab.content}
          </TabPanel>
        )}
      </Box>
    </Box>
    
  )
}
