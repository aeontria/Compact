// Compact function will detect of media width

import { useState, useEffect } from 'react'

function Compact() {
  const [compact, setCompact] = useState(false)

  function handleResize() {
    const screenWidth = window.innerWidth
    if (screenWidth < 768) {
      setCompact(true)
    } else {
      setCompact(false)
    }
  }

  useEffect(() => {
    handleResize() 
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [setCompact])

  return compact
}

export default Compact