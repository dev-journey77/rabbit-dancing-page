import { useState, useEffect } from 'react'
import rabbitSvg from '../assets/images/rabbit.svg'
import '../styles/animations.css'

const DancingRabbit = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault()
        toggleAnimation()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAnimating])

  return (
    <div className="dancing-rabbit-container">
      <div className={`rabbit-wrapper ${isAnimating ? 'dancing' : ''}`}>
        <img src={rabbitSvg} alt="Dancing Rabbit" className="rabbit-image" />
      </div>

      <div className="controls">
        <button
          onClick={toggleAnimation}
          className={`dance-button ${isAnimating ? 'active' : ''}`}
          aria-label={isAnimating ? '댄스 멈추기' : '댄스 시작하기'}
          tabIndex={0}
        >
          {isAnimating ? '댄스 멈추기' : '댄스 시작!'}
        </button>
        <p className="control-hint">
          스페이스바나 엔터키로도 토글할 수 있어요!
        </p>
      </div>
    </div>
  )
}

export default DancingRabbit