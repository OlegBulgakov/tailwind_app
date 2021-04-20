import React, {useState, useCallback} from "react";

export const Collapse = ({mainComponent, subComponent}) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  return (
    <>
      <div onClick={handleToggle}>
        {mainComponent}
      </div>
      {isVisible && subComponent}
    </>
  )
}