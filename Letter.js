import React from 'react'
import PropTypes from 'prop-types'

import './Letter.css'

const HIDDEN_SYMBOL = '_'

const Letter = ({ letter, feedback }) => (
  <span className="letter_to_find">
    {feedback === 'hidden' ? HIDDEN_SYMBOL : letter}
  </span>
)

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  feedback: PropTypes.oneOf([
    'hidden',
    'visible'
  ]).isRequired,
}

export default Letter
