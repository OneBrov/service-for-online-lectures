import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import styles from './ActionButton.module.scss'

interface ActionButtonProps {
    activeTooltip: string;
    notActiveTooltip: string;
    activeSrc: string;
    notActiveSrc: string; 
    isActive: boolean;
    onClick: () => void;
}

export const ActionButton:React.FC<ActionButtonProps> = ({
  activeTooltip, notActiveTooltip, activeSrc, notActiveSrc, isActive, onClick
}) => {
  
  return (
    <Tooltip title={isActive ? activeTooltip : notActiveTooltip}>
      <IconButton 
        onClick={onClick} 
        className={styles.buttonBackground}
      >
        <img 
          src={isActive ? activeSrc : notActiveSrc}  
          width={48} 
          height={48} 
          alt={isActive ? activeTooltip : notActiveTooltip }
        />     
      </IconButton>
    </Tooltip>
  )
}
